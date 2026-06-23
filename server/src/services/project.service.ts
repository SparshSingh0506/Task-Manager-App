import { createProject, getAllProjectsByUserId, deleteProjectById } from "../repositories/project.repository.js";
import type { CreateProjectInput } from "../types/dbOperations.interfaces.js";

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