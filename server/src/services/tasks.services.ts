import { createTask } from "../repositories/tasks.repository.js";
import type { CreateTaskInput } from "../schemas/tasks.zod-schemas.js";


export const createTaskService = async (CreateTaskInput: CreateTaskInput) => {
  return await createTask(CreateTaskInput);
}