import express from "express";

import indexRouter from "./routes/index.routes.js"
import { globalErrorHandler } from "./middlewares/global-error-handler.middleware.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Task Manager API! Please use Postman or similar app to test endpoints listed in docs.",
    version: "1.0.0"
  });
});

app.use('/api/v1', indexRouter);

app.use(globalErrorHandler);

export default app;