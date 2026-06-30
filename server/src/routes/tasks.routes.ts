import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.middleware.js";

import { validateRequest } from "../middlewares/validate-requests.middleware.js";
import { tasksPostSchema } from "../schemas/tasks.zod-schemas.js";

import { 
  getAllTasksController, 
  getTaskByIdController, 
  postTaskController } 
from "../controllers/tasks.controllers.js";



const router = Router({ mergeParams: true });

router.post('/', authenticate, validateRequest(tasksPostSchema), postTaskController);
router.get('/', authenticate, getAllTasksController);
router.get('/:taskId', authenticate, getTaskByIdController);


export default router;