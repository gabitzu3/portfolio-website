"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { LOG_ACTIONS } from "@/lib/logging/actions";
import { logAction } from "@/lib/logging/logger";
import { createClient } from "@/lib/supabase/server";
import { postSchema } from "@/lib/validators/post";
import type { ActionResult } from "@/types";
function parsePostFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    excerpt: formData.get("excerpt"),
    category: formData.get("category"),
    status: formData.get("status"),
    coverImageUrl: formData.get("coverImageUrl"),
  };
}
export async function createPostAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = postSchema.safeParse(parsePostFormData(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: parsed.data.title,
      slug: parsed.data.slug,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt || null,
      category: parsed.data.category,
      status: parsed.data.status,
      cover_image_url: parsed.data.coverImageUrl || null,
      author_id: user.id,
      published_at: parsed.data.status === "published" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();
  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to create post" };
  }
  await logAction({
    action: LOG_ACTIONS.POST_CREATE,
    userId: user.id,
    entityType: "post",
    entityId: data.id,
    metadata: { title: parsed.data.title },
  });
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath("/");
  redirect(`/admin/posts/${data.id}/edit`);
}
export async function updatePostAction(
  postId: string,
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = postSchema.safeParse(parsePostFormData(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("posts")
    .select("published_at")
    .eq("id", postId)
    .single();
  const publishedAt =
    parsed.data.status === "published"
      ? existing?.published_at ?? new Date().toISOString()
      : null;
  const { error } = await supabase
    .from("posts")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt || null,
      category: parsed.data.category,
      status: parsed.data.status,
      cover_image_url: parsed.data.coverImageUrl || null,
      published_at: publishedAt,
    })
    .eq("id", postId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.POST_UPDATE,
    userId: user.id,
    entityType: "post",
    entityId: postId,
    metadata: { title: parsed.data.title },
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  revalidatePath("/admin/posts");
  revalidatePath("/");
  return { success: true };
}
export async function deletePostAction(postId: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, slug")
    .eq("id", postId)
    .single();
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.POST_DELETE,
    userId: user.id,
    entityType: "post",
    entityId: postId,
    metadata: { title: post?.title },
  });
  revalidatePath("/blog");
  if (post?.slug) revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/posts");
  revalidatePath("/");
  return { success: true };
}
