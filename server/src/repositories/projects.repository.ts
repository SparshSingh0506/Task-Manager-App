import { db } from "../config/db.config.js";
import type { CreateProjectInput } from "../schemas/projects.zod-schemas.js";
import type { Project } from "../types/schema.interfaces.js";


export const createProject = async (createProjectInput: CreateProjectInput): Promise<Project> => {
  const { userId, title, description } = createProjectInput;

  const query = ` 
    INSERT INTO projects (
      user_id,
      title,
      description
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [userId, title, description];

  const result = await db.query<Project>(query, values);

  return result.rows[0]!;
  // structurally guranteed from db to return one row or either throw db error if insertion fails, so returning null is impossible here
}


export const getAllProjectsByUserId = async (userId: string): Promise<Project[]> => {
  const query = `
    SELECT * FROM projects
    WHERE user_id = $1
  `;

  const values = [userId];

  const result = await db.query<Project>(query, values);

  return result.rows;
}


export const deleteProjectById = async (userId: string, projectId: string): Promise<Project | null> => {
  const query =
    `DELETE FROM projects 
    WHERE user_id = $1 
    AND id = $2
    RETURNING *`;
  //db level check for authorization of user to delete a project.

  const values = [userId, projectId];
  const result = await db.query<Project>(query, values);

  return result.rows[0] ?? null;
}


export const getProjectById = async (userId: string, projectId: string): Promise<Project | null> => {
  const query =
    `SELECT * 
    FROM projects 
    WHERE 
      user_id = $1
      AND 
      id = $2`;

  const values = [userId, projectId];

  const result = await db.query<Project>(query, values);

  return result.rows[0] ?? null;
}