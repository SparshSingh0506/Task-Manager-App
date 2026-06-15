import type { Request, Response, NextFunction } from "express";
import { registerSchema } from "../schemas/register.schema.js";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const result = registerSchema.safeParse(req.body);
  //safeParse from zod wont throw error in case of failure, so no try-catch needed.

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request body",
      error: result.error.flatten(),
    });
  }

  next();
}