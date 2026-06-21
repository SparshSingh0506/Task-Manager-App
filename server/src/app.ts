import express from "express";
import authRoutes from "./routes/auth.routes.js"
import projects from "./routes/projects.route.js"

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes); // /register & /login

app.use('/api', projects);

export default app;