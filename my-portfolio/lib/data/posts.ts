import { createClient } from "@/lib/supabase/server";
import type { Post, PostCategory } from "@/types";
export async function getPublishedPosts(category?: PostCategory) {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (category) {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Post[];
}
export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) return null;
  return data as Post;
}
export async function getRecentPosts(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Post[];
}
export async function getAllPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Post[];
}
export async function getPostById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Post;
}
