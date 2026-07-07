import { AppError } from "../utils/errors/errors.util.js";
import { getProjectById } from "../repositories/projects.repository.js";
import { createTask, deleteTask, getAllTasksByProjectId, getTaskById, updateTask } from "../repositories/tasks.repository.js";
import type { CreateTaskInput, PatchTaskSchema } from "../schemas/tasks.zod-schemas.js";


export const createTaskService = async (CreateTaskInput: CreateTaskInput) => {
  const createdTaskDetails = await createTask(CreateTaskInput);

  if (!createdTaskDetails) throw new AppError(404, "Project not found.")

  return createdTaskDetails;
}


export const getAllTasksService = async (userId: string, projectId: string) => {
  const projectDetails = await getProjectById(userId, projectId);

  // Check project exists and is owned by the correct user
  if (!projectDetails) throw new AppError(404, "Project not found.")

  return await getAllTasksByProjectId(projectId);
}


export const getTaskByIdService = async (userId: string, projectId: string, taskId: string) => {
  const project = await getProjectById(userId, projectId);

  if (!project) throw new AppError(404, "Project not found.")

  const task = await getTaskById(projectId, taskId);

  if (!task) throw new AppError(404, "Task not found.")

  return task;
}


export const deleteTaskService = async (userId: string, projectId: string, taskId: string) => {
  const deletedTask = await deleteTask(projectId, taskId);

  if (!deletedTask) throw new AppError(404, "Task not found.")

  return deletedTask;
}


export const patchTaskService = async (projectId: string, taskId: string, updates: PatchTaskSchema) => {
  const patchedTaskDetails = await updateTask(projectId, taskId, updates);

  if (!patchedTaskDetails) throw new AppError(404, "Task not found.")

  return patchedTaskDetails;
}