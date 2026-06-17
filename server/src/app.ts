import express from "express";
import registerRouter from "./routes/register.route.js"
import loginRouter from "./routes/login.route.js"

const app = express();

app.use(express.json());

app.use('/api/auth', registerRouter);// /api/auth/register
app.use('/api/auth', loginRouter);

export default app;