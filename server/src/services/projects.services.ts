import type { CreateProjectInput } from "../schemas/projects.zod-schemas.js";
import { createProject, getAllProjectsByUserId, deleteProject, getProjectById } from "../repositories/projects.repository.js";


// no business logic here yet, but keeping it open for future scaling
export const createProjectService = (createProjectInput: CreateProjectInput) => {
  return createProject(createProjectInput);
}


export const getAllProjectsService = (userId: string) => {
  return getAllProjectsByUserId(userId);
}


export const getProjectByIdService = async (userId: string, projectId: string) => {
  const projectDetails = await getProjectById(userId, projectId);

  if (!projectDetails) throw {
    status: 404,
    message: "Project not found."
  }

  return projectDetails;
}


export const deleteProjectService = async (userId: string, projectId: string) => {
  const deletedProjectDetails = await deleteProject(userId, projectId);

  if (!deletedProjectDetails) throw {
    status: 404,
    message: "Project not found."
  }

  return deletedProjectDetails;
}
