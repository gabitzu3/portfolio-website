"use server";
import { revalidatePath } from "next/cache";
import { getSessionProfile } from "@/lib/auth/get-user";
import { LOG_ACTIONS } from "@/lib/logging/actions";
import { logAction } from "@/lib/logging/logger";
import { createClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/validators/auth";
import type { ActionResult } from "@/types";
export async function updateProfileAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session) {
    return { success: false, error: "You must be logged in" };
  }
  const focusAreasRaw = formData.get("focusAreas");
  const focusAreas =
    typeof focusAreasRaw === "string" && focusAreasRaw.length > 0
      ? focusAreasRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    username: formData.get("username"),
    title: formData.get("title"),
    bio: formData.get("bio"),
    focusAreas,
  });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  let avatarUrl: string | null = null;
  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile.size > 0) {
    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${session.user.id}/${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from("public-assets")
      .upload(filePath, avatarFile, {
        upsert: true,
      });

    if (uploadError) {
      return { success: false, error: `Failed to upload avatar: ${uploadError.message}` };
    }

    const { data: { publicUrl } } = supabase.storage
      .from("public-assets")
      .getPublicUrl(filePath);

    avatarUrl = publicUrl;
  }
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.fullName,
      username: parsed.data.username,
      title: parsed.data.title || null,
      bio: parsed.data.bio || null,
      focus_areas: parsed.data.focusAreas ?? [],
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    })
    .eq("id", session.user.id);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.PROFILE_UPDATE,
    userId: session.user.id,
    entityType: "profile",
    entityId: session.user.id,
  });
  revalidatePath("/profile");
  revalidatePath("/");
  return { success: true };
}
