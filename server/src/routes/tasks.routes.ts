import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.middleware.js";

import { validateRequest } from "../middlewares/validate-requests.middleware.js";
import { postTaskSchema } from "../schemas/tasks.zod-schemas.js";

import { 
  getAllTasksController, 
  getTaskByIdController, 
  postTaskController, 
  deleteTaskController} 
from "../controllers/tasks.controllers.js";


const router = Router({ mergeParams: true });

router.post('/', authenticate, validateRequest(postTaskSchema), postTaskController);
router.get('/', authenticate, getAllTasksController);
router.get('/:taskId', authenticate, getTaskByIdController);
router.delete('/:taskId', authenticate, deleteTaskController);


export default router;