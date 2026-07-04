import { getProjectById } from "../repositories/projects.repository.js";
import { createTask, deleteTask, getAllTasksByProjectId, getTaskById, updateTask } from "../repositories/tasks.repository.js";
import type { CreateTaskInput, PatchTaskSchema } from "../schemas/tasks.zod-schemas.js";


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

  // Check project exists and is owned by the correct user
  if (!projectDetails) throw {
    status: 404,
    message: "Project not found."
  }

  return await getAllTasksByProjectId(projectId);
}


export const getTaskByIdService = async (userId: string, projectId: string, taskId: string) => {
  const project = await getProjectById(userId, projectId);

  if (!project) throw {
    status: 404,
    message: "Project not found."
  }

  const task = await getTaskById(projectId, taskId);

  if (!task) throw {
    status: 404,
    message: "Task not found."
  }

  return task;
}


export const deleteTaskService = async (userId: string, projectId: string, taskId: string) => {
  const deletedTask = await deleteTask(projectId, taskId);

  if (!deletedTask) throw {
    status: 404,
    message: "Task not found."
  }

  return deletedTask;
}


export const patchTaskService = async (projectId: string, taskId: string, updates: PatchTaskSchema) => {
  const patchedTaskDetails = await updateTask(projectId, taskId, updates);

  if (!patchedTaskDetails) throw {
    status: 404,
    message: "Task not found."
  }

  return patchedTaskDetails;
}