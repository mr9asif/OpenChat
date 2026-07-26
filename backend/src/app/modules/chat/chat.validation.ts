import { z } from "zod";

export const chatValidation = z.object({
  body: z.object({
    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(5000, "Message is too long"),
  }),
});
