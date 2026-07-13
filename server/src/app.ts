import express from "express";

import indexRouter from "./routes/index.routes.js"
import { globalErrorHandler } from "./middlewares/global-error-handler.middleware.js";

const app = express();

app.use(express.json());

app.use('/api/v1', indexRouter);

app.use(globalErrorHandler);

export default app;