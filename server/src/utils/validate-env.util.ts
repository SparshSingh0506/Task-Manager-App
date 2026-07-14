import { env } from "../config/env.config.js";

export const validateEnv = () => env;
// simply access env to set const parsed values and throw error right away if fields missing.