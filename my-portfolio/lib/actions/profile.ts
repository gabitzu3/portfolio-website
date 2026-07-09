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
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.fullName,
      username: parsed.data.username,
      title: parsed.data.title || null,
      bio: parsed.data.bio || null,
      focus_areas: parsed.data.focusAreas ?? [],
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
