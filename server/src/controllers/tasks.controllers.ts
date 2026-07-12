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
      data: createdTaskDetails
    })
  }

  catch (error) {
    next(error);
  }
}


export const getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId as string;
  const page = Number(req.query.page) || 1;

  const MAX_LIMIT = 20;
  const limit = Math.max(1, Math.min(Number(req.query.limit) || 10, MAX_LIMIT));

  try {
    const { paginatedTasks, ...paginationDetails } = await getAllTasksService(userId, projectId, page, limit);

    res.status(200).json({
      message: "All tasks retrieved successfully.",
      data: paginatedTasks,
      pagination: {
        page,
        limit,
        ...paginationDetails
      }
    })
  }

  catch (error) {
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
      data: taskDetails
    })
  }

  catch(error) {
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
      data: deletedTaskDetails
    })
  }

  catch(error) {
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
      data: patchedTaskDetails
    })
  }

  catch (error) {
    next(error);
  }
} 
