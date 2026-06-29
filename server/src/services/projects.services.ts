import type { CreateProjectInput } from "../schemas/projects.zod-schemas.js";
import { createProject, getAllProjectsByUserId, deleteProjectById, getProjectById } from "../repositories/projects.repository.js";


// no business logic here yet, but keeping it open for future scaling
export const createProjectService = (createProjectInput: CreateProjectInput) => {
  return createProject(createProjectInput);
}


export const getAllProjectsService = (userId: string) => {
  return getAllProjectsByUserId(userId);
}


export const deleteProjectService = (userId: string, projectId: string) => {
  return deleteProjectById(userId, projectId);
}


export const getProjectByIdService = (userId: string, project_id: string) => {
  return getProjectById(userId, project_id); 
}