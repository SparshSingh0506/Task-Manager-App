import type { Request, Response } from "express";
import { createTaskService } from "../services/tasks.services.js";
import type { CreateTaskInput, TasksPostSchema } from "../schemas/tasks.zod-schemas.js";

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
    console.log(error);

      res.status(400).json({
      message: "Failed to create task.",
    })
  }
}