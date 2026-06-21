import { createProject } from "../repositories/project.repository.js";
import type { CreateProjectInput } from "../types/dbOperations.interfaces.js";

// no business logic here, but keeping for future scalability
export const createProjectService = async (createProjectInput: CreateProjectInput) => {
  return await createProject(createProjectInput);
}