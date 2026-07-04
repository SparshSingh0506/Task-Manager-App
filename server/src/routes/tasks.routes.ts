import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.middleware.js";

import { validateRequest } from "../middlewares/validate-requests.middleware.js";
import { patchTaskSchema, postTaskSchema } from "../schemas/tasks.zod-schemas.js";

import { 
  getAllTasksController, 
  getTaskByIdController, 
  postTaskController, 
  deleteTaskController,
  patchTaskController} 
from "../controllers/tasks.controllers.js";


const router = Router({ mergeParams: true });

router.post('/', authenticate, validateRequest(postTaskSchema), postTaskController);
router.get('/', authenticate, getAllTasksController);
router.get('/:taskId', authenticate, getTaskByIdController);
router.delete('/:taskId', authenticate, deleteTaskController);
router.patch('/:taskId', authenticate, validateRequest(patchTaskSchema), patchTaskController);


export default router;