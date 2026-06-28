import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.middleware.js";

import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { tasksPostSchema } from "../schemas/tasks.zod-schemas.js";

import { getAllTasksController, postTaskController } from "../controllers/tasks.controllers.js";


const router = Router({ mergeParams: true });

router.post('/', authenticate, validateRequest(tasksPostSchema), postTaskController);
router.get('/', authenticate, getAllTasksController);

export default router;