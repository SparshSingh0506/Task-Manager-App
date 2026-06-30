import express from "express";

import indexRouter from "./routes/index.routes.js"
import { errorHandler } from "./middlewares/global-error-handler.middleware.js";

const app = express();

app.use(express.json());

app.use('/api/v1', indexRouter);

app.use(errorHandler);

export default app;