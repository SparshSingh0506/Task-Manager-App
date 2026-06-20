import { Router } from "express";

import { registerController } from "../controller/register.controller.js";
import { validateRegisterPOST } from "../middleware/validations/validate-register.middleware.js";

const router = Router();

router.post('/register', validateRegisterPOST, registerController);

export default router;