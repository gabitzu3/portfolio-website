"use server";
import { revalidatePath } from "next/cache";
import { getSessionProfile } from "@/lib/auth/get-user";
import { requireAdmin } from "@/lib/auth/require-admin";
import { LOG_ACTIONS } from "@/lib/logging/actions";
import { logAction } from "@/lib/logging/logger";
import { createClient } from "@/lib/supabase/server";
import { reviewSchema } from "@/lib/validators/review";
import type { ActionResult } from "@/types";
export async function submitReviewAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const session = await getSessionProfile();
  if (!session) {
    return { success: false, error: "You must be logged in to submit a review" };
  }
  const ratingRaw = formData.get("rating");
  const parsed = reviewSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    content: formData.get("content"),
    rating: ratingRaw === "" || ratingRaw === null ? undefined : ratingRaw,
  });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      submitter_id: session.user.id,
      name: parsed.data.name,
      role: parsed.data.role || null,
      content: parsed.data.content,
      rating: typeof parsed.data.rating === "number" ? parsed.data.rating : null,
      status: "pending",
    })
    .select("id")
    .single();
  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to submit review" };
  }
  await logAction({
    action: LOG_ACTIONS.REVIEW_SUBMIT,
    userId: session.user.id,
    entityType: "review",
    entityId: data.id,
  });
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  return { success: true };
}
export async function moderateReviewAction(
  reviewId: string,
  status: "approved" | "rejected",
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("reviews")
    .update({
      status,
      moderated_by: user.id,
      moderated_at: new Date().toISOString(),
    })
    .eq("id", reviewId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: status === "approved" ? LOG_ACTIONS.REVIEW_APPROVE : LOG_ACTIONS.REVIEW_REJECT,
    userId: user.id,
    entityType: "review",
    entityId: reviewId,
    metadata: { status },
  });
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true };
}
export async function deleteReviewAction(reviewId: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.REVIEW_REJECT,
    userId: user.id,
    entityType: "review",
    entityId: reviewId,
    metadata: { deleted: true },
  });
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true };
}
