import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.middleware.js";

import { validateRequest } from "../middlewares/validate-requests.middleware.js";
import { patchProjectSchema, postProjectSchema } from "../schemas/projects.zod-schemas.js";

import { 
  deleteProjectController, 
  getAllProjectsController, 
  getProjectByIdController, 
  patchProjectController, 
  postProjectController 
} from "../controllers/projects.controllers.js";

const router = Router();

router.post('/', authenticate, validateRequest(postProjectSchema), postProjectController); 
router.get('/', authenticate, getAllProjectsController);
router.get('/:projectId', authenticate, getProjectByIdController);
router.delete('/:projectId', authenticate, deleteProjectController);
router.patch('/:projectId', authenticate, validateRequest(patchProjectSchema), patchProjectController);

export default router;  

// POST /api/v1/projects
// GET /api/v1/projects
// GET /api/v1/projects/:projectId
// DELETE /api/v1/projects/:projectId
// PATCH /api/v1/projects/:projectId


