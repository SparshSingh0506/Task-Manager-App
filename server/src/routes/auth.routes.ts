import { Router } from "express";

import { registerController, loginController } from "../controllers/auth.controllers.js";
import { validateRegister, validateLogin } from "../middlewares/validations/auth.validations.js";

const router = Router();

router.post('/register', validateRegister, registerController);
router.post('/login', validateLogin, loginController);

export default router;
