import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";


export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => { // this function will be returned to router middleware, where it will be executed in the expected order.
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request body",
        error: result.error.format
      });
    }

    req.body = result.data;

    next();
  }
}