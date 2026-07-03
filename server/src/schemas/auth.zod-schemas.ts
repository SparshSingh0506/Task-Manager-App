import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim()
    .min(3, "Username must be atleast 3 characters long.")
    .max(20, "Username must be atmost 20 characters long."),

  email: z.string().trim().check(z.email()).toLowerCase(),
  password: z.string()
    .min(6, "Password must be atleast 6 characters long.")
    .max(100, "Password must be atmost 100 characters long."),
}).strict();
export type UserRegistrationInput = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  email: z.string().trim().check(z.email()).toLowerCase(),
  password: z.string().min(1, "Password is required")
}).strict();
export type UserLoginInput = z.infer<typeof loginSchema>;


export const authenticatePayloadSchema = z.object({
  sub: z.string(),
  iat: z.number().optional()
});
export type AuthenticatePayload = z.infer<typeof authenticatePayloadSchema>;
