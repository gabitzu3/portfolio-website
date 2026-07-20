import { z } from "zod";
const optionalText = z.string().max(10000).optional().or(z.literal(""));
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  description: z.string().min(1, "Description is required"),
  tags: z.string().optional().or(z.literal("")),
  coverImageUrl: z.union([z.url(), z.literal("")]).optional(),
  status: z.enum(["draft", "published"]),
  importance: z.coerce.number().int().min(0).max(100).default(0),
  sortOrder: z.coerce.number().int().default(0),
  operation: optionalText,
  statusLabel: optionalText,
  duration: z.string().max(100).optional().or(z.literal("")),
  objective: optionalText,
  architecture: optionalText,
  lessonsLearned: optionalText,
  demoUrl: z.union([z.url(), z.literal("")]).optional(),
  repoUrl: z.union([z.url(), z.literal("")]).optional(),
  featured: z.boolean().default(false),
});
export type ProjectInput = z.infer<typeof projectSchema>;