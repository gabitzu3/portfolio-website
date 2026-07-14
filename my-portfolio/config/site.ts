export const siteConfig = {
  name: "Portfolio Platform",
  description:
    "A production-ready personal portfolio platform with blog, achievements, certifications, and reviews.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
} as const;
export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "Achievements", href: "/achievements" },
  { title: "Certifications", href: "/certifications" },
  { title: "Reviews", href: "/reviews" },
] as const;
export const authNav = [
  { title: "Login", href: "/login" },
  { title: "Sign up", href: "/signup" },
] as const;
export const adminNav = [
  { title: "Dashboard", href: "/admin" },
  { title: "Posts", href: "/admin/posts" },
  { title: "Achievements", href: "/admin/achievements" },
  { title: "Certifications", href: "/admin/certifications" },
  { title: "Reviews", href: "/admin/reviews" },
  { title: "Logs", href: "/admin/logs" },
] as const;