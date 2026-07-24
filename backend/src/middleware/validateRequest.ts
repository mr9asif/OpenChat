import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validateRequest =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Body:", req.body);
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = (result.data as any).body;

    next();
  };
