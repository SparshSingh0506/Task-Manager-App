import { getProjectById } from "../repositories/projects.repository.js";
import { createTask, getAllTasksByProjectId } from "../repositories/tasks.repository.js";
import type { CreateTaskInput } from "../schemas/tasks.zod-schemas.js";


export const createTaskService = async (CreateTaskInput: CreateTaskInput) => {
  const createdTaskDetails = await createTask(CreateTaskInput);

  if (!createdTaskDetails) throw {
    status: 404,
    message: "Project not found."
  }

  return createdTaskDetails;
}


export const getAllTasksService = async (userId: string, projectId: string) => {
  const projectDetails = await getProjectById(userId, projectId);

  // 1. check project exists and is owned by the correct user
  if (!projectDetails) throw {
    status: 404,
    message: "Project not found."
  }

  return await getAllTasksByProjectId(projectId);
}