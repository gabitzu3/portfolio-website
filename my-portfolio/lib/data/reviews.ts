import { createClient } from "@/lib/supabase/server";
import type { Review, ReviewStatus } from "@/types";
export async function getApprovedReviews() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Review[];
}
export async function getRecentReviews(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Review[];
}
export async function getReviewsByStatus(status?: ReviewStatus) {
  const supabase = await createClient();
  let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });
  if (status) {
    query = query.eq("status", status);
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Review[];
}
