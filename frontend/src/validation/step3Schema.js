import { z } from "zod";

export const step3Schema = z.object({
  cibilScore: z
    .string()
    .min(1, "Please select CIBIL score"),

  runningLoans: z
    .number()
    .min(0, "Value cannot be negative"),

  closedLoans: z
    .number()
    .min(0, "Value cannot be negative"),

  bounces6Months: z
    .number()
    .min(0, "Value cannot be negative"),

  bounces3Months: z
    .number()
    .min(0, "Value cannot be negative"),

  avgBankBalance: z
    .string()
    .min(1, "Please select average bank balance"),
});
