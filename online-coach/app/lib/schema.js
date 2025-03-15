import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  subIndustry: z.string({
    required_error: "Please select a specialization",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 0 && val <= 50, {
      message: "Experience must be between 0 and 50 years",
    }),
  skills: z
    .string()
    .transform((val) =>
      val ? val.split(",").map((skill) => skill.trim()).filter(Boolean) : []
    ),
});
