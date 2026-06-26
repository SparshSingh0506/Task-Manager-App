import { Router } from "express";

import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.zod-schemas.js";

import { registerController, loginController } from "../controllers/auth.controllers.js";

const router = Router();

router.post('/register', validateRequest(registerSchema), registerController);
router.post('/login', validateRequest(loginSchema), loginController);

export default router;
