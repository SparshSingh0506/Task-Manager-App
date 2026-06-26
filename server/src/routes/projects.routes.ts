import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.middleware.js";

import { validateRequest } from "../middlewares/validate-request.middleware.js";
import { projectsPostSchema } from "../schemas/projects.zod-schemas.js";

import { 
  deleteProjectController, 
  getAllProjectsController, 
  getProjectByIdController, 
  postProjectController 
} from "../controllers/projects.controllers.js";

const router = Router();

router.post('/projects', authenticate, validateRequest(projectsPostSchema), postProjectController);
router.get('/projects', authenticate, getAllProjectsController);
router.get('/projects/:projectId', authenticate, getProjectByIdController);
router.delete('/projects/:projectId', authenticate, deleteProjectController);

export default router;  


