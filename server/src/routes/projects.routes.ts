import { Router } from "express";
import { validateProjectsPOST } from "../middleware/validations/projects.validations.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { createProjectController } from "../controller/project.controllers.js";

const router = Router();

router.post('/projects', authenticate, validateProjectsPOST, createProjectController);

export default router;  