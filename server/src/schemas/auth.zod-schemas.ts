import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim().min(3),
  email: z.string().trim().check(z.email()).toLowerCase(),
  password: z.string().min(6),
});
export type UserRegistration = z.infer<typeof registerSchema>;



export const loginSchema = z.object({
  email: z.string().trim().check(z.email()).toLowerCase(),
  password: z.string().min(6),
});
export type UserLogin = z.infer<typeof loginSchema>;



export const authenticatePayloadSchema = z.object({
  sub: z.string(),
  iat: z.number().optional()
});
export type AuthenticatePayload = z.infer<typeof authenticatePayloadSchema>;
