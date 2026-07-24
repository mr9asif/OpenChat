import { z } from "zod";

const createProviderSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Provider name must be at least 2 characters"),

    baseUrl: z.string().url("Invalid base URL").optional(),

    isActive: z.boolean().optional(),
  }),
});

const updateProviderSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Provider name must be at least 2 characters")
      .optional(),

    baseUrl: z.string().url("Invalid base URL").optional(),

    isActive: z.boolean().optional(),
  }),
});

export const aiProviderValidation = {
  createProviderSchema,
  updateProviderSchema,
};
