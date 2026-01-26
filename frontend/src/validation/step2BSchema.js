import { z } from "zod";

export const step2BSchema = z
  .object({
    businessExperience: z
      .number({
        required_error: "Business experience is required",
        invalid_type_error: "Enter a valid number",
      })
      .min(0, "Value cannot be negative"),

    gstRegistered: z
      .string()
      .min(1, "Please select GST registration status"),

    gstVintage: z
      .number()
      .min(0, "Value cannot be negative")
      .optional(),

    turnoverTrend: z
      .string()
      .min(1, "Please select turnover trend"),

    profitTrend: z
      .string()
      .min(1, "Please select profit trend"),

    capitalTrend: z
      .string()
      .min(1, "Please select capital trend"),
  })
  .superRefine((data, ctx) => {
    if (data.gstRegistered === "Yes" && data.gstVintage == null) {
      ctx.addIssue({
        path: ["gstVintage"],
        message: "GST vintage is required when GST is registered",
        code: z.ZodIssueCode.custom,
      });
    }
  });
