import { z } from "zod";

export const step6Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must have at least 2 characters"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),

    email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  loanRequirement: z.string().optional(),
});
