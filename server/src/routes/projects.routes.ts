import { Router } from "express";
import { validateProjectPOST } from "../middlewares/validations/projects.validations.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { deleteProjectController, getAllProjectsController, getProjectByIdController, postProjectController } from "../controllers/project.controllers.js";

const router = Router();

router.post('/projects', authenticate, validateProjectPOST, postProjectController);
router.get('/projects', authenticate, getAllProjectsController);
router.get('/projects/:projectId', authenticate, getProjectByIdController);
router.delete('/projects/:projectId', authenticate, deleteProjectController);

export default router;  


