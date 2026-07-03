import { getProjectById } from "../repositories/projects.repository.js";
import { createTask, deleteTask, getAllTasksByProjectId, getTaskById } from "../repositories/tasks.repository.js";
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

// REFACTOR!!!! BOUND TO RACE CONDITIONS DUE TO TWO CALLS!
export const deleteTaskService = async (userId: string, projectId: string, taskId: string) => {
  const project = await getProjectById(userId, projectId);

  if (!project) throw {
    status: 404,
    message: "Project not found."
  }

  const deletedTask = await deleteTask(projectId, taskId);

  if (!deletedTask) throw {
    status: 404,
    message: "Task not found."
  }

  return deletedTask;
}