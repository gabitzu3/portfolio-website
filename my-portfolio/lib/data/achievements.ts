import { createClient } from "@/lib/supabase/server";
import type { Achievement } from "@/types";
export async function getPublishedAchievements() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("is_published", true)
    .order("achievement_date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Achievement[];
}
export async function getRecentAchievements(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("is_published", true)
    .order("achievement_date", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Achievement[];
}
export async function getAllAchievements() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("achievement_date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Achievement[];
}
