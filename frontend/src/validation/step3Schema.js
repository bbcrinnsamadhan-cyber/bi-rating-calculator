import { z } from "zod";

export const step3Schema = z.object({
  cibilScore: z
    .number({
      invalid_type_error: "CIBIL score must be a number",
    })
    .int("Decimal values are not allowed")
    .min(300, "CIBIL score must be between 300 and 900")
    .max(900, "CIBIL score must be between 300 and 900"),

  familyOwnedProperties: z
    .number({
      invalid_type_error: "Value must be a number",
    })
    .int("Decimal values are not allowed")
    .min(0, "Value cannot be negative"),
});