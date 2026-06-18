import { Router } from "express";

import { validateLoginRequest } from "../middleware/validate-login-request.middleware.js";
import { loginController } from "../controller/login.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/login', validateLoginRequest, loginController, authMiddleware);

export default router;