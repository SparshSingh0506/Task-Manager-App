import type { CreateProjectInput } from "../schemas/projects.zod-schemas.js";
import { createProject, getAllProjectsByUserId, deleteProjectById, getProjectById } from "../repositories/projects.repository.js";


// no business logic here yet, but keeping it open for future scaling
export const createProjectService = async (createProjectInput: CreateProjectInput) => {
  return await createProject(createProjectInput);
}


export const getAllProjectsService = async (userId: string) => {
  return await getAllProjectsByUserId(userId);
}


export const deleteProjectService = async (userId: string, projectId: string) => {
  return await deleteProjectById(userId, projectId);
}


export const getProjectByIdService = async (userId: string, project_id: string) => {
  return await getProjectById(userId, project_id); // not found error handled at controller
}