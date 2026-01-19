import { z } from "zod";

export const step5Schema = z.object({
  netWorthRatio: z
    .number({
      invalid_type_error: "Value must be a number",
    })
    .min(0, "Value cannot be negative")
    .refine(
      (val) => Number(val.toFixed(2)) === val,
      "Maximum 2 decimal places allowed"
    ),

  itrFiled: z.boolean({
    required_error: "Please select ITR filing status",
  }),

  collateralAvailable: z.boolean({
    required_error: "Please select collateral availability",
  }),
});
