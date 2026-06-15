import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim().min(3),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(6),
});

export type UserRegistration = z.infer<typeof registerSchema>;