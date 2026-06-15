import { Router } from "express";
import { registerHandler } from "../controller/auth.controller.js";
import { validateRegister } from "../middleware/validate-request.middleware.js";

const router = Router();

router.post('/register', validateRegister, registerHandler);

export default router;