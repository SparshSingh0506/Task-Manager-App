import type { CreateProjectInput } from "../types/dbOperations.interfaces.js";
import { createProject, getAllProjectsByUserId, deleteProjectById, getProjectById } from "../repositories/project.repository.js";

export const createProjectService = async (createProjectInput: CreateProjectInput) => {
  // no business logic here yet, but keeping it open for future scaling
  return await createProject(createProjectInput);
}


export const getAllProjectsService = async (userId: string) => {
  const allProjects = await getAllProjectsByUserId(userId);
  const allSummarizedProjects = allProjects.map(({id, title, description, updated_at}) => ({id, title, description, updated_at}));

  return allSummarizedProjects;
}


export const deleteProjectService = async (userId: string, projectId: string) => {
  const deletedRows = await deleteProjectById(userId, projectId);

  if (deletedRows === 0) throw new Error("ProjectId not found.");
  
  return deletedRows;
}


export const getProjectByIdService = async (userId: string, project_id: string) => {
  const foundProject = await getProjectById(userId, project_id);

  if (!foundProject) throw new Error("ProjectId not found.");
  
  return foundProject;
}