import type { NextFunction, Request, Response } from "express";
import { createTaskService, deleteTaskService, getAllTasksService, getTaskByIdService, patchTaskService } from "../services/tasks.services.js";
import type { CreateTaskInput, PatchTaskSchema } from "../schemas/tasks.zod-schemas.js";

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


export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId as string;
  const taskId = req.params.taskId as string;

  try {
    const deletedTaskDetails = await deleteTaskService(userId, projectId, taskId);

    res.status(200).json({
      message: "Task deleted successfully.",
      taskDetails: deletedTaskDetails
    })
  }

  catch(error: any) {
    next(error);
  }
}


export const patchTaskController = async (req: Request, res: Response, next: NextFunction) => {
  const projectId = req.params.projectId as string; 
  const taskId = req.params.taskId as string;
  const updates: PatchTaskSchema = req.body;

  try {
    const patchedTaskDetails = await patchTaskService(projectId, taskId, updates);

    return res.status(200).json({
      message: "Task updated succesfully.",
      projectDetails: patchedTaskDetails
    })
  }

  catch (error) {
    next(error);
  }
} 
