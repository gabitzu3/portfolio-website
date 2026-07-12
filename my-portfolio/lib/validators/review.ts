import { z } from "zod";
export const reviewSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().max(100).optional().or(z.literal("")),
  content: z.string().min(10, "Review must be at least 10 characters").max(2000),
  rating: z.coerce
    .number()
    .int()
    .min(1)
    .max(5)
    .optional()
    .or(z.literal("")),
});
export type ReviewInput = z.infer<typeof reviewSchema>;