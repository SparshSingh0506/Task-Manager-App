import type { Request, Response, NextFunction } from "express";
import { registerSchema } from "../../schemas/register.zod-schema.js";

export const validateRegisterPOST = (req: Request, res: Response, next: NextFunction) => {
  const result = registerSchema.safeParse(req.body);
  //safeParse from zod wont throw error in case of failure, so no try-catch needed.

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request body",
      error: result.error.flatten(),
    });
  }

  req.body = result.data; 
  // this sets the orignal request body to the applied transformations by zod, which modifies the req body that will be passed to the next middleware

  next();
}

