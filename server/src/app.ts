import express from "express";
import authRoutes from "./routes/auth.routes.js"
import projectsRoutes from "./routes/projects.routes.js"

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes); // /register & /login

app.use('/api', projectsRoutes);

export default app;