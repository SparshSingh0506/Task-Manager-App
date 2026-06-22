import { createProject, getAllProjectsByUserId } from "../repositories/project.repository.js";
import type { CreateProjectInput } from "../types/dbOperations.interfaces.js";

// no business logic here yet, but keeping it open for future scaling
export const createProjectService = async (createProjectInput: CreateProjectInput) => {
  return await createProject(createProjectInput);
}

export const getAllProjectsService = async (user_id: string) => {
  const allProjects = await getAllProjectsByUserId(user_id);
  const allSummarizedProjects = allProjects.map(({id, title, description, updated_at}) => ({id, title, description, updated_at}));

  return allSummarizedProjects;
}