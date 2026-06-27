import { db } from "../config/db.config.js";
import type { CreateProjectInput } from "../schemas/projects.zod-schemas.js";
import type { Project } from "../types/schema.interfaces.js";



export const createProject = async (createProjectInput: CreateProjectInput): Promise<Project> => {
  const { userId, title, description } = createProjectInput;

  const result = await db.query(
    `INSERT INTO projects (
        user_id,
        title,
        description
      )
      VALUES ($1, $2, $3)
      RETURNING *`
    , [userId, title, description]
  );

  return result.rows[0] as Project;
}


export const getAllProjectsByUserId = async (userId: string): Promise<Project[]> => {
  const result = await db.query( // return all from repo layer, and filter required data in service layer.
    `SELECT * FROM projects
    WHERE user_id = $1`
    , [userId]
  );

  return result.rows as Project[];
}

type DeletedProject = Pick<Project, "id" | "user_id" | "title" | "description">
export const deleteProjectById = async (userId: string, projectId: string): Promise<DeletedProject> => {
  const result = await db.query( //db level check for authorization of user to delete a project.
    `DELETE FROM projects 
    WHERE user_id = $1 
    AND id = $2
    RETURNING
      id,
      user_id,
      title,
      description`
    , [userId, projectId]
  );

  return result.rows[0] as DeletedProject; // TODO!!!! MAKE THIS GENERIC and do summarized returning in the service layer!
}


export const getProjectById = async (userId: string, projectId: string): Promise<Project> => {
  const result = await db.query(
    `SELECT * FROM
    projects WHERE user_id = $1
    AND id = $2`
  , [userId, projectId])

  return result.rows[0] as Project;
}