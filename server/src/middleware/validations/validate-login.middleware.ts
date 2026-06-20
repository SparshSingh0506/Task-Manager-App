import type { Request, Response, NextFunction } from "express";
import { loginSchema } from "../../schemas/login.zod-schema.js";

export const validateLoginPOST = (req: Request, res: Response, next: NextFunction) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request body",
      error: result.error.flatten(),
    });
  }

  req.body = result.data;

  next();
}