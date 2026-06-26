import { Router } from "express";

import authRoutes from "./auth.routes.js"
import projectsRoutes from "./projects.routes.js"
import tasksRoutes from "./tasks.routes.js"

export const router = Router();

router.use('/auth', authRoutes);

router.use('/projects', projectsRoutes);
router.use('/projects/:projectId', tasksRoutes);

export default router;