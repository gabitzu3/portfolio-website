import { createClient } from "@/lib/supabase/server";
import type { Certification } from "@/types";
export async function getVisibleCertifications() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Certification[];
}
export async function getRecentCertifications(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Certification[];
}
export async function getAllCertifications() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Certification[];
}
