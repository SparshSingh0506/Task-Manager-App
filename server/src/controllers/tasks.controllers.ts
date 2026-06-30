import type { NextFunction, Request, Response } from "express";
import { createTaskService, getAllTasksService } from "../services/tasks.services.js";
import type { CreateTaskInput } from "../schemas/tasks.zod-schemas.js";

export const postTaskController = async (req: Request, res: Response, next: NextFunction) => {
  const CreateTaskInput: CreateTaskInput = {
    userId: req.userId,
    projectId: req.params.projectId,
    ...req.body
  };

  try {
    const createdTaskDetails = await createTaskService(CreateTaskInput);

    res.status(201).json({
      message: "Task created succesfully.",
      taskDetail: createdTaskDetails
    })
  }

  catch (error: any) {
    error.status = 400;
    error.message = "Task creation failed.";

    next(error);
  }
}


export const getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId;

  try {
    const allTasksDetails = await getAllTasksService(userId, projectId as string);

    res.status(200).json({
      message: "All tasks retrieved successfully.",
      tasks: allTasksDetails
    })
  }

  catch (error: any) {
    next(error);
  }
}
