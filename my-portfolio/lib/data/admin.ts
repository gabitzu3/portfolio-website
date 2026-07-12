import { createClient } from "@/lib/supabase/server";
import type { Log, Profile } from "@/types";
export async function getOwnerProfile() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_admin", true)
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as Profile | null;
}
export async function getAdminStats() {
  const supabase = await createClient();
  const [posts, achievements, certifications, pendingReviews, logsToday] =
    await Promise.all([
      supabase.from("posts").select("id", { count: "exact", head: true }),
      supabase.from("achievements").select("id", { count: "exact", head: true }),
      supabase.from("certifications").select("id", { count: "exact", head: true }),
      supabase
        .from("reviews")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("logs")
        .select("id", { count: "exact", head: true })
        .gte("created_at", new Date().toISOString().slice(0, 10)),
    ]);
  return {
    posts: posts.count ?? 0,
    achievements: achievements.count ?? 0,
    certifications: certifications.count ?? 0,
    pendingReviews: pendingReviews.count ?? 0,
    logsToday: logsToday.count ?? 0,
  };
}
export async function getRecentLogs(limit = 10) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Log[];
}
export interface LogFilters {
  action?: string;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}
export async function getLogs(filters: LogFilters = {}) {
  const supabase = await createClient();
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 50;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  let query = supabase
    .from("logs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);
  if (filters.action) query = query.eq("action", filters.action);
  if (filters.userId) query = query.eq("user_id", filters.userId);
  if (filters.dateFrom) query = query.gte("created_at", filters.dateFrom);
  if (filters.dateTo) query = query.lte("created_at", `${filters.dateTo}T23:59:59`);
  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return {
    logs: (data ?? []) as Log[],
    total: count ?? 0,
    page,
    pageSize,
  };
}