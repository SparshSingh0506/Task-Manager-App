import { Router } from "express";
import { validateProjectsPOST } from "../middleware/validations/projects.validations.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { createProjectController } from "../controller/project.controller.js";

const router = Router();

router.post('/projects', validateProjectsPOST, authenticate, createProjectController);

export default router;  