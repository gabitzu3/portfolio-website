"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { LOG_ACTIONS } from "@/lib/logging/actions";
import { logAction } from "@/lib/logging/logger";
import { createClient } from "@/lib/supabase/server";
import { projectSchema } from "@/lib/validators/project";
import type { ActionResult } from "@/types";
function parseProjectFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    tags: formData.get("tags"),
    coverImageUrl: formData.get("coverImageUrl"),
    status: formData.get("status"),
    importance: formData.get("importance"),
    sortOrder: formData.get("sortOrder"),
    operation: formData.get("operation"),
    statusLabel: formData.get("statusLabel"),
    duration: formData.get("duration"),
    objective: formData.get("objective"),
    architecture: formData.get("architecture"),
    lessonsLearned: formData.get("lessonsLearned"),
    demoUrl: formData.get("demoUrl"),
    repoUrl: formData.get("repoUrl"),
    featured: formData.get("featured") === "on",
  };
}
function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
export async function createProjectAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = projectSchema.safeParse(parseProjectFormData(formData));
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return {
      success: false,
      error: firstError
        ? `${firstError.path.join(".")}: ${firstError.message}`
        : "Invalid input",
    };
  }
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      tags: parseTags(parsed.data.tags),
      cover_image_url: parsed.data.coverImageUrl || null,
      status: parsed.data.status,
      importance: parsed.data.importance,
      sort_order: parsed.data.sortOrder,
      operation: parsed.data.operation || null,
      status_label: parsed.data.statusLabel || null,
      duration: parsed.data.duration || null,
      objective: parsed.data.objective || null,
      architecture: parsed.data.architecture || null,
      lessons_learned: parsed.data.lessonsLearned || null,
      demo_url: parsed.data.demoUrl || null,
      repo_url: parsed.data.repoUrl || null,
      featured: parsed.data.featured,
      published_at: parsed.data.status === "published" ? now : null,
    })
    .select("id")
    .single();
  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to create project" };
  }
  await logAction({
    action: LOG_ACTIONS.PROJECT_CREATE,
    userId: user.id,
    entityType: "project",
    entityId: data.id,
  });
  revalidatePath("/projects");
  revalidatePath("/blog");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect(`/admin/projects?edit=${data.id}`);
}
export async function updateProjectAction(
  projectId: string,
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const parsed = projectSchema.safeParse(parseProjectFormData(formData));
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return {
      success: false,
      error: firstError
        ? `${firstError.path.join(".")}: ${firstError.message}`
        : "Invalid input",
    };
  }
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("projects")
    .select("status, published_at")
    .eq("id", projectId)
    .single();
  const publishedAt =
    parsed.data.status === "published"
      ? existing?.published_at ?? new Date().toISOString()
      : null;
  const { error } = await supabase
    .from("projects")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      tags: parseTags(parsed.data.tags),
      cover_image_url: parsed.data.coverImageUrl || null,
      status: parsed.data.status,
      importance: parsed.data.importance,
      sort_order: parsed.data.sortOrder,
      operation: parsed.data.operation || null,
      status_label: parsed.data.statusLabel || null,
      duration: parsed.data.duration || null,
      objective: parsed.data.objective || null,
      architecture: parsed.data.architecture || null,
      lessons_learned: parsed.data.lessonsLearned || null,
      demo_url: parsed.data.demoUrl || null,
      repo_url: parsed.data.repoUrl || null,
      featured: parsed.data.featured,
      published_at: publishedAt,
    })
    .eq("id", projectId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.PROJECT_UPDATE,
    userId: user.id,
    entityType: "project",
    entityId: projectId,
  });
  revalidatePath("/projects");
  revalidatePath("/blog");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}
export async function deleteProjectAction(projectId: string): Promise<ActionResult> {
  const { user } = await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", projectId);
  if (error) {
    return { success: false, error: error.message };
  }
  await logAction({
    action: LOG_ACTIONS.PROJECT_DELETE,
    userId: user.id,
    entityType: "project",
    entityId: projectId,
  });
  revalidatePath("/projects");
  revalidatePath("/blog");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}