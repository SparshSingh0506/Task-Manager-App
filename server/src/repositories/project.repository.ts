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