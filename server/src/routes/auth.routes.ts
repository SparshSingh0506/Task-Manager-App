import { Router } from "express";

import { registerController, loginController } from "../controller/auth.controllers.js";
import { validateRegister, validateLogin } from "../middleware/validations/auth.validations.js";

const router = Router();

router.post('/register', validateRegister, registerController);
router.post('/login', validateLogin, loginController);

export default router;
