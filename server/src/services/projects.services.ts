import type { CreateProjectInput, PatchProjectSchema } from "../schemas/projects.zod-schemas.js";
import { createProject, getAllProjectsByUserId, deleteProject, getProjectById, updateProject } from "../repositories/projects.repository.js";
import { AppError } from "../utils/errors/errors.util.js";


// no business logic here yet, but keeping it open for future scaling
export const createProjectService = (createProjectInput: CreateProjectInput) => {
  return createProject(createProjectInput);
}


export const getAllProjectsService = (userId: string) => {
  return getAllProjectsByUserId(userId);
}


export const getProjectByIdService = async (userId: string, projectId: string) => {
  const projectDetails = await getProjectById(userId, projectId);

  if (!projectDetails) throw new AppError(404, "Project not found.")

  return projectDetails;
} 


export const deleteProjectService = async (userId: string, projectId: string) => {
  const deletedProjectDetails = await deleteProject(userId, projectId);

  if (!deletedProjectDetails) throw new AppError(404, "Project not found.")

  return deletedProjectDetails;
}


export const patchProjectService = async (userId: string, projectId: string, updates: PatchProjectSchema) => {
  const patchedProjectDetails = await updateProject(userId, projectId, updates);

  if (!patchedProjectDetails) throw new AppError(404, "Project not found.")

  return patchedProjectDetails;
}
