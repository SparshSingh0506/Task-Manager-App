import type { Request, Response, NextFunction } from "express";
import { projectsPostSchema } from "../../schemas/projects/projects-post.zod-schema.js";

export const validateProjectsPOST = (req: Request, res: Response, next: NextFunction) => {
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