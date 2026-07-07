import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";
import {z} from "zod"
import { AppError } from "../utils/errors/errors.util.js";


export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => { // this function will be returned to router middleware, where it will be executed in the expected order.
    const result = schema.safeParse(req.body);

    if (!result.success) throw new AppError(400, z.prettifyError(result.error))

    req.body = result.data;

    next();
  }
}