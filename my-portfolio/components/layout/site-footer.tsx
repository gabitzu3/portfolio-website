import Link from "next/link";
import {mainNav, siteConfig } from "@/config/site";
export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-1">
          <p className="font-medium">{siteConfig.name}</p>
          <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
        </div>
        <nav className="flex flex-wrap gap-4">
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
      </div>
    </footer>
  );
}