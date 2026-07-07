import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors/errors.util.js";

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {

    console.error(
      `[Client] ${error.status} ${req.method} ${req.originalUrl}`
    );

    console.error(error.stack);

    return res.status(error.status).json({
      message: error.message
    });

  }

  console.error(
    `[Server] 500 ${req.method} ${req.originalUrl}`
  );

  if (error instanceof Error) {
    console.error(error.stack);
  } 
  
  else {
    console.error(error);
  }

  return res.status(500).json({
    message: "Internal Server Error."
  });
}