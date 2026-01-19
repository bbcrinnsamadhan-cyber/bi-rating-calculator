import { z } from "zod";

export const step4Schema = z.object({
  runningLoans: z
    .number()
    .min(0, "negative valued not allowed"),

  closedLoans: z
    .number()
    .int("Decimal not allowed")
    .min(0, "Negative value not allowed"),

  bounces12: z
    .number()
    .int("Decimal not allowed")
    .min(0, "Negative value not allowed"),

  bounces6: z
    .number()
    .int("Decimal not allowed")
    .min(0, "Negative value not allowed"),
});