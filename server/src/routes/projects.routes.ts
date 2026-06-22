import { Router } from "express";
import { validateProjectsPOST } from "../middleware/validations/projects.validations.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { deleteProjectController, getAllProjectsController, postProjectController } from "../controller/project.controllers.js";

const router = Router();

router.post('/projects', authenticate, validateProjectsPOST, postProjectController);
router.get('/projects', authenticate, getAllProjectsController);
router.delete('/projects/:id', authenticate, deleteProjectController)

export default router;  