import { createTask, getAllTasksByUserId } from "../repositories/tasks.repository.js";
import type { CreateTaskInput } from "../schemas/tasks.zod-schemas.js";


export const createTaskService = (CreateTaskInput: CreateTaskInput) => {
  return createTask(CreateTaskInput);
}

export const getAllTasksService = (userId: string, projectId: string) => {
  return getAllTasksByUserId(userId, projectId);
}