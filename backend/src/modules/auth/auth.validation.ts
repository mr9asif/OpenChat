import { z } from "zod";

export const googleLoginValidation = z.object({
  body: z.object({
    token: z.string().min(1, "Google token is required"),
  }),
});
