import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/types";
interface AdminHeaderProps {
  profile: Profile;
}
export function AdminHeader({ profile }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div>
        <p className="text-sm text-muted-foreground">Signed in as</p>
        <p className="font-medium">{profile.full_name ?? profile.username}</p>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="outline" size="sm">
            View Site
          </Button>
        </Link>
        <form action={logoutAction}>
          <Button variant="outline" size="sm" type="submit">
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}