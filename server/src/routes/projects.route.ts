import { Router } from "express";
import { validateProjectsPOST } from "../middleware/validations/validate-projects-post.js";
import { authenticate } from "../middleware/authenticate.middleware.js";

const router = Router();

router.post('/projects', validateProjectsPOST, authenticate);

export default router;  