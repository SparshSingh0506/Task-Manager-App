import type { CreateProjectInput, PatchProjectSchema } from "../schemas/projects.zod-schemas.js";
import { createProject, getAllProjectsByUserId, deleteProject, getProjectById, updateProject, getTotalProjects } from "../repositories/projects.repository.js";
import { AppError } from "../utils/errors/errors.util.js";


export const createProjectService = (createProjectInput: CreateProjectInput) => {
  return createProject(createProjectInput);
}


export const getAllProjectsService = async (userId: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const [paginatedProjects, totalProjects ] = await Promise.all([
    getAllProjectsByUserId(userId, limit, offset), 
    getTotalProjects(userId)
  ]);

  const totalPages = Math.ceil(totalProjects / limit)

  return {
    paginatedProjects,
    totalProjects, 
    totalPages
  };
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
