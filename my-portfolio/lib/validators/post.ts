import { z } from "zod";
export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(500).optional().or(z.literal("")),
  category: z.enum(["cybersecurity", "leadership", "projects"]),
  status: z.enum(["draft", "published"]),
  coverImageUrl: z.union([z.url(), z.literal("")]).optional(),
});
export type PostInput = z.infer<typeof postSchema>;