import { Router } from "express";
import { registerController } from "../controller/register.controller.js";
import { validateRegisterRequest } from "../middleware/validate-register-request.middleware.js";

const router = Router();

router.post('/register', validateRegisterRequest, registerController);

export default router;