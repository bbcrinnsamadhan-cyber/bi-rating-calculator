import { z } from "zod";

export const step2BSchema = z
  .object({
    // FIX: Preprocess use karein taaki empty string "" number mein convert ho sake
    businessExperience: z.preprocess(
      (val) => (val === "" || val === null ? undefined : Number(val)),
      z.number({
        invalid_type_error: "Enter business experience in years",
        required_error: "Experience is required",
      }).min(0, "Experience cannot be negative")
    ),

    gstRegistered: z.boolean({
      required_error: "Please select GST registration status",
    }),

    // FIX: GST Vintage ke liye bhi Preprocess zaroori hai
    gstVintage: z.preprocess(
      (val) => (val === "" || val === null ? undefined : Number(val)),
      z.number({
        invalid_type_error: "GST vintage must be a number",
      })
      .min(0, "GST vintage cannot be negative")
      .optional()
    ),

    turnoverTrend: z.enum(["Positive", "Flat", "Negative"], {
      required_error: "Please select turnover trend",
    }),

    profitTrend: z.enum(["Positive", "Flat", "Negative"], {
      required_error: "Please select profit trend",
    }),

    capitalTrend: z.enum(["Positive", "Stable", "Declining"], {
      required_error: "Please select capital / net worth trend",
    }),
  })
  .refine(
    (data) => {
      // Logic: Agar GST Registered hai, to Vintage undefined nahi hona chahiye
      if (data.gstRegistered === true) {
        return data.gstVintage !== undefined && data.gstVintage !== null;
      }
      return true;
    },
    {
      message: "GST Vintage is required when GST is registered",
      path: ["gstVintage"],
    }
  );