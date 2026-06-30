import type { Request, Response, NextFunction } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error?.status ?? 500;
  const message = error?.message ?? "Internal Server Error.";

  const origin = (status >= 500) ? "Server": "Client";

  console.error(
    `[${origin} Error] ${status}: ${message}
    ${error.stack}`
  );

  return res.status(status).json({
    message: message,
  })
}