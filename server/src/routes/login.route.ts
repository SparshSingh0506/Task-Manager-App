import { Router } from "express";

import { validateLoginPOST } from "../middleware/validations/validate-login.middleware.js";
import { loginController } from "../controller/login.controller.js";

const router = Router();

router.post('/login', validateLoginPOST, loginController);

export default router;