import type { NextFunction, Request, Response } from "express";
import { createTaskService, getAllTasksService, getTaskByIdService } from "../services/tasks.services.js";
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
  const projectId = req.params.projectId as string;

  try {
    const allTasksDetails = await getAllTasksService(userId, projectId);

    res.status(200).json({
      message: "All tasks retrieved successfully.",
      tasks: allTasksDetails
    })
  }

  catch (error: any) {
    next(error);
  }
}


export const getTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId as string;
  const taskId = req.params.taskId as string;

  try {
    const taskDetails = await getTaskByIdService(userId, projectId, taskId);

    res.status(200).json({
      message: "Task retrieved successfully.",
      taskDetails: taskDetails
    })
  }

  catch(error: any) {
    next(error);
  }
}
