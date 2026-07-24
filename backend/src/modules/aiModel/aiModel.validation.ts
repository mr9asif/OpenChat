import { z } from "zod";

const createModelSchema = z.object({
  body: z.object({
    providerId: z.string().min(1, "Provider ID is required"),

    name: z.string().min(2, "Model name must be at least 2 characters"),

    modelSlug: z.string().min(2, "Model slug is required"),

    priority: z.number().int().positive().optional(),

    isFree: z.boolean().optional(),

    isActive: z.boolean().optional(),
  }),
});

const updateModelSchema = z.object({
  body: z.object({
    providerId: z.string().min(1).optional(),

    name: z.string().min(2).optional(),

    modelSlug: z.string().min(2).optional(),

    priority: z.number().int().positive().optional(),

    isFree: z.boolean().optional(),

    isActive: z.boolean().optional(),
  }),
});

export const aiModelValidation = {
  createModelSchema,
  updateModelSchema,
};
