import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { postTasksController } from "../controllers/tasks.controllers.js";

const router = Router();

router.post('/projects/:projectId/tasks', authenticate, postTasksController)

export default router;