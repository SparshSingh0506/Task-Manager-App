import type { Request, Response } from "express";
import { createTaskService, getAllTasksService } from "../services/tasks.services.js";
import type { CreateTaskInput } from "../schemas/tasks.zod-schemas.js";

export const postTaskController = async (req: Request, res: Response) => {

  const CreateTaskInput: CreateTaskInput = {
    userId: req.userId,
    projectId: req.params.projectId,
    ...req.body
  };

  try {
    const createdTaskDetails = await createTaskService(CreateTaskInput);

    res.status(201).json({
      message: "Task succesfully created!",
      taskDetail: createdTaskDetails
    })
  }

  catch (error) {
    console.error(error);

    res.status(400).json({
      message: error instanceof Error ? error.message : "Something went wrong"
    })
  }
}


export const getAllTasksController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const projectId = req.params.projectId;

  if (!projectId) return res.status(400).json({
    message: "project id not found."
  })

  try {
    const retrievedTasks = await getAllTasksService(userId, projectId as string);

    res.status(200).json({
      message: "Task succesfully created!",
      tasks: retrievedTasks
    })
  }

  catch (error) {
    console.error(error);

    res.status(400).json({
      message: error instanceof Error ? error.message : "Something went wrong"
    })
  }
}
