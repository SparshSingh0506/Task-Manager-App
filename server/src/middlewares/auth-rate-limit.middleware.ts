import type { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';
import { AppError } from '../utils/errors/errors.util.js';

const REGISTER_MAX_ATTEMPTS = 5;
const REGISTER_RATE_LIMIT_MINUTES = 10;

export const registerRateLimiter = rateLimit({
  max: REGISTER_MAX_ATTEMPTS,
  windowMs: REGISTER_RATE_LIMIT_MINUTES * 60 * 1000,
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(429, `Too many requests. Try again after ${REGISTER_RATE_LIMIT_MINUTES} minutes.`));
  },
  standardHeaders: true,
  legacyHeaders: false,
})


const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_RATE_LIMIT_MINUTES = 10 ;

export const loginRateLimiter = rateLimit({
  max: LOGIN_MAX_ATTEMPTS,
  windowMs: LOGIN_RATE_LIMIT_MINUTES * 60 * 1000, 
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(429, `Too many requests. Try again after ${LOGIN_RATE_LIMIT_MINUTES} minutes.`));
  },
  standardHeaders: true,
  legacyHeaders: false,
});