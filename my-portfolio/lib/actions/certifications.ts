"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { LOG_ACTIONS } from "@/lib/logging/actions";
import { logAction } from "@/lib/logging/logger";
import { createClient } from "@/lib/supabase/server";
import { certificationSchema } from "@/lib/validators/certification";
import type { ActionResult } from "@/types";
export async function createCertificationAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Certificate file is required" };
  }
  const parsed = certificationSchema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    issuedDate: formData.get("issuedDate"),
    expiryDate: formData.get("expiryDate"),
    isVisible: formData.get("isVisible") === "on" || formData.get("isVisible") === "true",
    sortOrder: formData.get("sortOrder"),
  });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const filePath = `${user.id}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("certificates")
    .upload(filePath, file, { contentType: file.type, upsert: false });
  if (uploadError) {
    return { success: false, error: uploadError.message };
  }
  const { data, error } = await supabase
    .from("certifications")
    .insert({
      title: parsed.data.title,
      issuer: parsed.data.issuer || null,
      issued_date: parsed.data.issuedDate || null,
      expiry_date: parsed.data.expiryDate || null,
      file_path: filePath,
      file_type: file.type,
      is_visible: parsed.data.isVisible,
      sort_order: parsed.data.sortOrder,
    })
    .select("id")
    .single();
  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to save certification" };
  }
  await logAction({
    action: LOG_ACTIONS.CERTIFICATION_UPLOAD,
    userId: user.id,
    entityType: "certification",
    entityId: data.id,
    metadata: { title: parsed.data.title },
  });
  revalidatePath("/certifications");
  revalidatePath("/admin/certifications");
  revalidatePath("/");
  redirect(`/admin/certifications?edit=${data.id}`);
}
export async function updateCertificationAction(
  certificationId: string,
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = certificationSchema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    issuedDate: formData.get("issuedDate"),
    expiryDate: formData.get("expiryDate"),
    isVisible: formData.get("isVisible") === "on" || formData.get("isVisible") === "true",
    sortOrder: formData.get("sortOrder"),
  });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("certifications")
    .update({
      title: parsed.data.title,
      issuer: parsed.data.issuer || null,
      issued_date: parsed.data.issuedDate || null,
      expiry_date: parsed.data.expiryDate || null,
      is_visible: parsed.data.isVisible,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", certificationId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.CERTIFICATION_UPDATE,
    userId: user.id,
    entityType: "certification",
    entityId: certificationId,
  });
  revalidatePath("/certifications");
  revalidatePath("/admin/certifications");
  revalidatePath("/");
  return { success: true };
}
export async function deleteCertificationAction(
  certificationId: string,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const supabase = await createClient();
  const { data: cert } = await supabase
    .from("certifications")
    .select("file_path")
    .eq("id", certificationId)
    .single();
  if (cert?.file_path) {
    await supabase.storage.from("certificates").remove([cert.file_path]);
  }
  const { error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", certificationId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.CERTIFICATION_DELETE,
    userId: user.id,
    entityType: "certification",
    entityId: certificationId,
  });
  revalidatePath("/certifications");
  revalidatePath("/admin/certifications");
  revalidatePath("/");
  return { success: true };
}
export async function getCertificateDownloadUrlAction(
  certificationId: string,
): Promise<ActionResult<{ url: string }>> {
  await requireAdmin();
  const supabase = await createClient();
  const { data: cert, error } = await supabase
    .from("certifications")
    .select("file_path, title")
    .eq("id", certificationId)
    .single();
  if (error || !cert) {
    return { success: false, error: "Certificate not found" };
  }
  const { data: signed, error: signError } = await supabase.storage
    .from("certificates")
    .createSignedUrl(cert.file_path, 60);
  if (signError || !signed) {
    return { success: false, error: signError?.message ?? "Failed to generate download URL" };
  }
  return { success: true, data: { url: signed.signedUrl } };
}