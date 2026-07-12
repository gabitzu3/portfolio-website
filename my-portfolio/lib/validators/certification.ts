import { z } from "zod";
export const certificationSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  issuer: z.string().max(200).optional().or(z.literal("")),
  issuedDate: z.string().optional().or(z.literal("")),
  expiryDate: z.string().optional().or(z.literal("")),
  isVisible: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).default(0),
});
export type CertificationInput = z.infer<typeof certificationSchema>;