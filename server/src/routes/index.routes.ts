import { Router } from "express";

import authRoutes from "./auth.routes.js"
import projectsRoutes from "./projects.routes.js"
import tasksRoutes from "./tasks.routes.js"

export const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectsRoutes);
router.use('/projects/:projectId/tasks', tasksRoutes);

export default router;

// AUTH:
// POST api/v1/auth/register
// POST api/v1/auth/login

// PROJECTS:
// POST /api/v1/projects
// GET /api/v1/projects
// GET /api/v1/projects/:projectId
// DELETE /api/v1/projects/:projectId
// PATCH /api/v1/projects/:projectId

// LOGIN:
// POST /api/v1/projects/:projectId/tasks
// GET /api/v1/projects/:projectId/tasks
// GET /api/v1/projects/:projectId/tasks/:taskId
// DELETE /api/v1/projects/:projectId/tasks/:taskId
// PATCH /api/v1/projects/:projectId/tasks/:taskId