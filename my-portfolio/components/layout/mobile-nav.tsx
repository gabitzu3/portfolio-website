"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authNav, mainNav } from "@/config/site";
import type { Profile } from "@/types";
interface MobileNavProps {
  session: { profile: Profile } | null;
}
export function MobileNav({ session }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden inline-flex shrink-0 items-center justify-center rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9">
        <Menu className="size-4" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
          <div className="border-t pt-4">
            {session ? (
              <>
                <Link href="/profile" className="block text-sm font-medium">
                  Profile
                </Link>
                {session.profile.is_admin ? (
                  <Link href="/admin" className="mt-4 block text-sm font-medium">
                    Admin
                  </Link>
                ) : null}
              </>
            ) : (
              authNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm font-medium not-last:mb-4"
                >
                  {item.title}
                </Link>
              ))
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
