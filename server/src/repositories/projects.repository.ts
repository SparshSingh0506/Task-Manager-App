import { db } from "../config/db.config.js";
import type { CreateProjectInput } from "../schemas/projects.zod-schemas.js";
import type { Project } from "../types/schema.interfaces.js";


export const createProject = async (createProjectInput: CreateProjectInput): Promise<Project> => {
  const { userId, title, description } = createProjectInput;

  const query = 
    `INSERT INTO projects (
      user_id,
      title,
      description
    )
    VALUES ($1, $2, $3)
    RETURNING *`;

  const values = [userId, title, description];

  const result = await db.query(query, values);

  return result.rows[0] as Project;
}


export const getAllProjectsByUserId = async (userId: string): Promise<Project[]> => {
  const query = 
    `SELECT * FROM projects
    WHERE user_id = $1`;

  const values = [userId];

  const result = await db.query(query, values);
  // return all from repo layer, and filter required data in service layer.

  return result.rows as Project[];
}


type DeletedProject = Pick<Project, "id" | "user_id" | "title" | "description">
export const deleteProjectById = async (userId: string, projectId: string): Promise<DeletedProject> => {
  const query =
    `DELETE FROM projects 
    WHERE user_id = $1 
    AND id = $2
    RETURNING
      id,
      user_id,
      title,
      description`;

  const values = [userId, projectId];
  const result = await db.query(query, values );//db level check for authorization of user to delete a project.

  return result.rows[0] as DeletedProject; // TODO!!!! MAKE THIS GENERIC and do summarized returning in the service layer!
}


export const getProjectById = async (userId: string, projectId: string): Promise<Project> => {
  const query = 
    `SELECT * FROM
    projects WHERE user_id = $1
    AND id = $2`;
  
  const values = [userId, projectId];

  const result = await db.query(query, values);

  return result.rows[0] as Project;
}