import { Router } from "express";
import { registerController } from "../controller/auth.controller.js";
import { validateRegisterRequest } from "../middleware/validate-request.middleware.js";

const router = Router();

router.post('/register', validateRegisterRequest, registerController);

export default router;