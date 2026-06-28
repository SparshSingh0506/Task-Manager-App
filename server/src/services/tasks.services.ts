import { createTask, getAllTasksByUserId } from "../repositories/tasks.repository.js";
import type { CreateTaskInput } from "../schemas/tasks.zod-schemas.js";


export const createTaskService = async (CreateTaskInput: CreateTaskInput) => {
  const createdTaskDetails = await createTask(CreateTaskInput);

  if (!createdTaskDetails) throw new Error("Failed to create Task.")

    return createdTaskDetails;
}

export const getAllTasksService = async (userId: string, projectId: string) => {
  const tasks = await getAllTasksByUserId(userId, projectId);

  if (!tasks) throw new Error("Project not Found.");

  return tasks;
}