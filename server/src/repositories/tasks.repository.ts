import { db } from "../config/db.config.js";

import type { CreateTaskInput, PatchTaskSchema } from "../schemas/tasks.zod-schemas.js";
import type { Task } from "../types/schema.interfaces.js";
import { buildSetClause } from "../utils/db/patch-query-builder.util.js";


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


export const getAllTasksByProjectId = async (projectId: string, limit: number, offset: number): Promise<Task[]> => {
  const query = `
    SELECT * FROM tasks
    WHERE project_id = $1
    ORDER BY updated_at DESC
    LIMIT $2
    OFFSET $3
  `;

  const values = [projectId, limit, offset];

  const result = await db.query<Task>(query, values);

  return result.rows;
}


export const getTotalTasksByProjectId = async (projectId: string): Promise<number> => {
  const query = `
    SELECT COUNT(*)
    FROM tasks
    WHERE project_id = $1
  `;

  const values = [projectId];

  const result = await db.query(query, values);

  return Number(result.rows[0].count);
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


export const updateTask = async (projectId: string, taskId: string, updates: PatchTaskSchema): Promise<Task | null> => {
  const { setClause, values } = buildSetClause(updates);

  values.push(...[projectId, taskId]);

  const n = values.length;

  const query = `
    UPDATE tasks
    SET 
      ${setClause},
      updated_at = NOW()
    WHERE
      project_id = $${n - 1}
      AND
      id = $${n}
    RETURNING *
  `;

  const result = await db.query(query, values);

  return result.rows[0] ?? null;
}
