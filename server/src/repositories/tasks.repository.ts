import { db } from "../config/db.config.js";

import type { CreateTaskInput } from "../schemas/tasks.zod-schemas.js";
import type { Task } from "../types/schema.interfaces.js";


export const createTask = async (createTaskInput: CreateTaskInput): Promise<Task | null> => {
  const { 
    userId,
    projectId,
    title,
    description,
    status,
    priority,
    due_date
  } = createTaskInput;

  // const inputColumnString = Object.keys(createTaskInput).join(', '); // TOMBSTONE of a bad practice - prone to sql injection.
  // solution - write all column names manually for maximum safety

  // data modification query must be atomic, processing both authZ and insertion, to prevent race conditions
  const query = `
    INSERT INTO tasks(
      project_id,
      title,
      description,
      status,
      priority,
      due_date
    )
    SELECT 
      p.id, $3, $4, $5, $6, $7
    FROM projects AS p
    WHERE 
      p.user_id = $1
      AND
      p.id = $2
    RETURNING *
  `;
  
  const values = [userId, projectId, title, description, status, priority, due_date]

  const result = await db.query<Task>(query, values)

  return result.rows[0] ?? null; // null would be returned if SELECT query returns nothing, i.e. project was not found
}


export const getAllTasksByProjectId = async (projectId: string): Promise<Task[]> => {
  const query = `
    SELECT * FROM tasks
    WHERE project_id = $1
  `;

  const values = [projectId];

  const result = await db.query<Task>(query, values);

  return result.rows;
}


export const getTaskById = async (projectId: string, taskId: string): Promise<Task | null> => {
  const query = `
    SELECT * FROM tasks
    WHERE 
      project_id = $1
      AND
      id = $2
  `;

  // project id is already validated before
  const values = [projectId, taskId];

  const result = await db.query<Task>(query, values);

  return result.rows[0] ?? null;
}


export const deleteTask = async (projectId: string, taskId: string): Promise<Task | null> => {
  const query = `
    DELETE FROM tasks
    WHERE
      project_id = $1
      AND
      id = $2
    RETURNING *
  `;

  const values = [projectId, taskId];

  const result = await db.query<Task>(query, values);

  return result.rows[0] ?? null;
}