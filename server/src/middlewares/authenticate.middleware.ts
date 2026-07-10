import 'dotenv/config';
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticatePayloadSchema } from '../schemas/auth.zod-schemas.js';
import { AppError } from '../utils/errors/errors.util.js';

// this middleware shall be checked primarily for every request to this app's api end points.
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // 1. Get header and check if exists
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header missing or invalid."
    });
  }

  // 2. Split authorization header & get jwt token
  const accessToken = authHeader.split(" ")[1];
  // req header -> {"Authentication": "Bearer <jwt token>"} -> after split(" ") => ["Bearer", "<jwt token>"], accessing [1] to get token.

  if (!accessToken) return res.status(401).json({
    message: "Token not found."
  });

  // 3. verify token and payload
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET!); // jwt.verify() returns decoded payload object, here {"sub": <user id>, "iat" : 123...}

    const result = authenticatePayloadSchema.safeParse(payload);

    if (!result.success) {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }

    req.userId = result.data.sub;

    next();
  }

  catch (error) {
    throw new AppError(401, "Authentication failed");
  }
}