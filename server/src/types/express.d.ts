// purpose - declaration file to prevent typescript errors on appending custom properties to express Request type
// This will add user? property in default express Response type and allow res.user to be accessable throughout the project for auth with jwt

import type { AuthenticatePayload } from "../schemas/authenticate-payload.zod-schema.ts"

// export {};

declare global {
  namespace Express {
    interface Request {
      userId?: AuthenticatePayload
    }
  }
}