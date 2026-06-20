import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().check(z.email()).toLowerCase(),
  password: z.string().min(6),
});

export type UserLogin = z.infer<typeof loginSchema>;