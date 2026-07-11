import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return null;
  }
  return user;
}
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error || !data) {
    return null;
  }
  return data;
}
export async function getSessionProfile(): Promise<{
  user: NonNullable<Awaited<ReturnType<typeof getUser>>>;
  profile: Profile;
} | null> {
  const user = await getUser();
  if (!user) return null;
  const profile = await getProfile(user.id);
  if (!profile) return null;
  return { user, profile };
}
