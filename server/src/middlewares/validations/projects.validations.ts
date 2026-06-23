import type { Request, Response, NextFunction } from "express";
import { projectsPostSchema } from "../../schemas/projects.zod-schemas.js";

export const validateProjectPOST = (req: Request, res: Response, next: NextFunction) => {
  const result = projectsPostSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request body",
      error: result.error.flatten(),
    });
  }

  req.body = result.data;

  next();
}