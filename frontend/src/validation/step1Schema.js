import { z } from "zod";

export const step1Schema = z.object({
  age: z
    .number({
      invalid_type_error: "Age must be a number",
    })
    .int("Decimal values are not allowed")
    .min(18, "Age must be at least 18 years")
    .max(70, "Age cannot be more than 70 years"),

  experience: z
    .number({
      invalid_type_error: "Experience must be a number",
    })
    .int("Decimal values are not allowed")
    .min(0, "Experience cannot be negative"),
});