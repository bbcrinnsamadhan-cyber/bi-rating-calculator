import { z } from "zod";

export const step2ASchema = z.object({
  totalExperience: z
    .number({
      required_error: "Total experience is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(0, "Experience cannot be negative"),

  currentOrgExperience: z
    .number({
      required_error: "Current organisation experience is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(0, "Experience cannot be negative"),

  employerType: z
    .string()
    .min(1, "Please select employer type"),

  designation: z
    .string()
    .min(2, "Designation is required"),
});
