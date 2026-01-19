import { z } from "zod";

export const step2Schema = z.object({
  gstRegistered: z.boolean({
    required_error: "Please select GST registration status",
  }),

  gstVintage: z
    .number()
    .int("Decimal values are not allowed")
    .min(0, "GST vintage cannot be negative")
    .optional(),

  turnoverTrend: z.boolean({
    required_error: "Please select turnover trend",
  }),

  profitTrend: z.boolean({
    required_error: "Please select profit trend",
  }),

  capitalTrend: z.boolean({
    required_error: "Please select capital trend",
  }),
});
