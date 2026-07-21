import Link from "next/link";
import { MobileNav} from "@/components/layout/mobile-nav";
import { Button} from "@/components/ui/button";
import {getSessionProfile } from "@/lib/auth/get-user";
import {authNav, mainNav, siteConfig} from "@/config/site";
export async function SiteHeader() {
  const session = await getSessionProfile();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              {session.profile.is_admin ? (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Admin
                  </Button>
                </Link>
              ) : null}
              <Link href={`/profile/${session.profile.username || session.profile.id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                {session.profile.avatar_url ? (
                  <img
                    src={session.profile.avatar_url}
                    alt={session.profile.full_name || "Avatar"}
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border">
                    <span className="text-xs font-medium">
                      {(session.profile.full_name || session.profile.username || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium">
                  {session.profile.username || session.profile.full_name || "User"}
                </span>
              </Link>
            </>
          ) : (
            authNav.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.href === "/signup" ? "default" : "outline"}
                  size="sm"
                >
                  {item.title}
                </Button>
              </Link>
            ))
          )}
        </div>
        <MobileNav session={session} />
      </div>
    </header>
  );
}