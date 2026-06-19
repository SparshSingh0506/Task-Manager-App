import { z } from "zod";

export const authenticatePayloadSchema = z.object({
  sub: z.string(),
  iat: z.number().optional()
});

export type AuthenticatePayload = z.infer<typeof authenticatePayloadSchema>;