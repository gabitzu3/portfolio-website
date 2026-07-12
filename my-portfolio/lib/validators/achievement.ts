import { z } from "zod";
export const achievementSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  achievementDate: z.string().min(1, "Date is required"),
  category: z.enum(["ctf", "internship", "competition", "education"]),
  mediaUrl: z.union([z.url(), z.literal("")]).optional(),
  mediaType: z.string().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isPublished: z.coerce.boolean().default(false),
});
export type AchievementInput = z.infer<typeof achievementSchema>;