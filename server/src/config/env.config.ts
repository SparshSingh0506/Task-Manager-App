import 'dotenv/config';
import { envSchema } from "../schemas/env.zod-schema.js";

export const env = envSchema.parse(process.env); 
// no try catch to immediately stop server init in case of missing env values.