import { Router } from "express";

import { validateRequest } from "../middlewares/validate-requests.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.zod-schemas.js";

import { registerUserController, loginUserController } from "../controllers/auth.controllers.js";

const router = Router();

router.post('/register', validateRequest(registerSchema), registerUserController);
router.post('/login', validateRequest(loginSchema), loginUserController);

export default router;
