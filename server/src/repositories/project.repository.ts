import { db } from "../config/db.config.js";
import type { CreateProjectInput } from "../types/dbOperations.interfaces.js";
import type { Project } from "../types/schema.interfaces.js";

type CreatedProject = Pick<Project, "id" | "user_id" | "title" | "description" | "created_at">

export const createProject = async ({ user_id, title, description }: CreateProjectInput): Promise<CreatedProject> => {
  const result = await db.query(
    `INSERT INTO projects (
        user_id,
        title,
        description
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        user_id,
        title,
        description,
        created_at`
    , [user_id, title, description]
  );

  return result.rows[0] as CreatedProject;
}


export const getAllProjectsByUserId = async (userId: string): Promise<Project[]> => {
  const result = await db.query( // return all from repo layer, and filter required data in service layer.
    `SELECT * FROM projects
    WHERE user_id = $1`
    , [userId]
  );

  return result.rows as Project[];
}


export const deleteProjectById = async (userId: string, projectId: string): Promise<number | null> => {
  const result = await db.query( //db level check for authorization of user to delete a project.
    `DELETE FROM projects 
    WHERE user_id = $1 
    AND id = $2 `
    , [userId, projectId]
  );

  return result.rowCount;
}

export const getProjectById = async (userId: string, projectId: string): Promise<Project> => {
  const result = await db.query(
    `SELECT * FROM
    projects WHERE user_id = $1
    AND id = $2`
  , [userId, projectId])

  return result.rows[0];
}