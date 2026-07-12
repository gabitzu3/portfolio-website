import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getClientEnv } from "@/lib/env";
import type { Database } from "@/types/database";
const AUTH_ROUTES = ["/login", "/signup"];
const PROTECTED_ROUTES = ["/profile", "/reviews/submit"];
const ADMIN_PREFIX = "/admin";
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const env = getClientEnv();
  const { pathname } = request.nextUrl;
  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if ((isProtectedRoute || isAdminRoute) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }
  if (isAdminRoute && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    if (!profile?.is_admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return supabaseResponse;
}
