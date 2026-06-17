import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(6),
});

export type UserLogin = z.infer<typeof loginSchema>;