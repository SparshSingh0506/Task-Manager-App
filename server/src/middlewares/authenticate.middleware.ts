import { env } from '../config/env.config.js';

import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { authenticatePayloadSchema } from '../schemas/auth.zod-schemas.js';

import { AppError } from '../utils/errors/errors.util.js';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) throw new AppError(401, "Authorization header missing or invalid.")

    const accessToken = authHeader.split(" ")[1];
    // req header -> {"Authentication": "Bearer <jwt token>"} -> after split(" ") => ["Bearer", "<jwt token>"], accessing [1] to get token.

    if (!accessToken) throw new AppError(401, "Jwt token missing.")
    
    const jwtSecretKey = env.JWT_SECRET;

    const payload = jwt.verify(accessToken, jwtSecretKey);

    const result = authenticatePayloadSchema.safeParse(payload);

    if (!result.success) throw new AppError(401, "Invalid token payload");

    req.userId = result.data.sub;

    next();
  }

  catch (error) {
    next(error)
  }
}