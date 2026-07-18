"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { LOG_ACTIONS } from "@/lib/logging/actions";
import { logAction } from "@/lib/logging/logger";
import { createClient } from "@/lib/supabase/server";
import { achievementSchema } from "@/lib/validators/achievement";
import type { ActionResult } from "@/types";
function parseAchievementFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    description: formData.get("description"),
    achievementDate: formData.get("achievementDate"),
    category: formData.get("category"),
    mediaUrl: formData.get("mediaUrl"),
    mediaType: formData.get("mediaType"),
    sortOrder: formData.get("sortOrder"),
    isPublished: formData.get("isPublished") === "on",
  };
}
export async function createAchievementAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = achievementSchema.safeParse(parseAchievementFormData(formData));
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { 
      success: false, 
      error: firstError ? `${firstError.path.join('.')}: ${firstError.message}` : "Invalid input" 
    };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("achievements")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description,
      achievement_date: parsed.data.achievementDate,
      category: parsed.data.category,
      media_url: parsed.data.mediaUrl || null,
      media_type: parsed.data.mediaType || null,
      sort_order: parsed.data.sortOrder,
      is_published: parsed.data.isPublished,
    })
    .select("id")
    .single();
  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to create achievement" };
  }
  await logAction({
    action: LOG_ACTIONS.ACHIEVEMENT_CREATE,
    userId: user.id,
    entityType: "achievement",
    entityId: data.id,
  });
  revalidatePath("/achievements");
  revalidatePath("/admin/achievements");
  revalidatePath("/");
  redirect(`/admin/achievements?edit=${data.id}`);
}
export async function updateAchievementAction(
  achievementId: string,
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = achievementSchema.safeParse(parseAchievementFormData(formData));
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { 
      success: false, 
      error: firstError ? `${firstError.path.join('.')}: ${firstError.message}` : "Invalid input" 
    };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("achievements")
    .update({
      title: parsed.data.title,
      description: parsed.data.description,
      achievement_date: parsed.data.achievementDate,
      category: parsed.data.category,
      media_url: parsed.data.mediaUrl || null,
      media_type: parsed.data.mediaType || null,
      sort_order: parsed.data.sortOrder,
      is_published: parsed.data.isPublished,
    })
    .eq("id", achievementId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.ACHIEVEMENT_UPDATE,
    userId: user.id,
    entityType: "achievement",
    entityId: achievementId,
  });
  revalidatePath("/achievements");
  revalidatePath("/admin/achievements");
  revalidatePath("/");
  return { success: true };
}
export async function deleteAchievementAction(
  achievementId: string,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("achievements")
    .delete()
    .eq("id", achievementId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.ACHIEVEMENT_DELETE,
    userId: user.id,
    entityType: "achievement",
    entityId: achievementId,
  });
  revalidatePath("/achievements");
  revalidatePath("/admin/achievements");
  revalidatePath("/");
  return { success: true };
}
