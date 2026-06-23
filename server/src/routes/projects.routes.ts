import { Router } from "express";
import { validateProjectPOST } from "../middlewares/validations/projects.validations.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { deleteProjectController, getAllProjectsController, postProjectController } from "../controllers/project.controllers.js";

const router = Router();

router.post('/projects', authenticate, validateProjectPOST, postProjectController);
router.get('/projects', authenticate, getAllProjectsController);
router.delete('/projects/:projectId', authenticate, deleteProjectController)

export default router;  


