import { Router } from "express";

import { validateLoginRequest } from "../middleware/validate-login-request.middleware.js";
import { loginController } from "../controller/login.controller.js";
import { authenticate } from "../middleware/authenticate.middleware.js";

const router = Router();

router.post('/login', validateLoginRequest, loginController);

export default router;