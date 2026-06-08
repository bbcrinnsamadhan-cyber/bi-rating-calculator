// import { z } from "zod";

// export const step1Schema = z.object({
//   fullName: z
//     .string()
//     .min(2, "Name must be at least 2 characters"),

//   age: z
//     .number()
//     .min(18, "Minimum age is 18")
//     .max(75, "Maximum age is 75"),

//   mobile: z
//     .string()
//     .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

//   email: z
//     .string()
//     .email("Enter a valid email address"),

//   applicantType: z.enum(
//     ["Salaried", "SEP", "SENP", "Others"],
//     {
//       required_error: "Please select applicant type",
//     }
//   ),
// });





import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),

  age: z.number().min(18, "Minimum age is 18").max(75, "Maximum age is 75"),

  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

  email: z
    .string()
    .email("Enter a valid email address")
    .refine(
      async (email) => {
        try {
          const response = await fetch(
            `https://apilayer.net/api/check?access_key=e9b841ebac6611b0b7fc7fdc4683a021&email=${email}`,
          );

          const data = await response.json();

          return data.format_valid && data.mx_found && data.smtp_check;
        } catch {
          return false;
        }
      },
      {
        message: "Please enter a real existing email",
      },
    ),

  applicantType: z.enum(["Salaried", "SEP", "SENP", "Others"], {
    required_error: "Please select applicant type",
  }),
});
