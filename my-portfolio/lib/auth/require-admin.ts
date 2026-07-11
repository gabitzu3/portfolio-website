import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/auth/get-user";
export async function requireAuth(redirectTo = "/login") {
  const session = await getSessionProfile();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}
export async function requireAdmin() {
  const session = await requireAuth();
  if (!session.profile.is_admin) {
    redirect("/");
  }
  return session;
}
