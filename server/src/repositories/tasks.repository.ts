import { db } from "../config/db.config.js";

import type { CreateTaskInput } from "../schemas/tasks.zod-schemas.js";
import type { Task } from "../types/schema.interfaces.js";

export const createTask = async (createTaskInput: CreateTaskInput): Promise<Task> => {
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

  const query =
    `INSERT INTO tasks(
      project_id,
      title,
      description,
      status,
      priority,
      due_date
    )

    SELECT 
      p.id,
      $3,
      $4,
      $5,
      $6,
      $7

    FROM projects AS p

    WHERE 
      p.user_id = $1
      AND
      p.id = $2

    RETURNING *`;
  
  const values = [userId, projectId, title, description, status, priority, due_date]

  const result = await db.query<Task>(query, values)
  // a little confusing query O.o | Select is executed before insert, FROM projects only returns p.id, $3...$7 are treated as constants not taken from projects table.
  // However, having both userId & projectId check in one query saves extra queries to the db to first check for valid user, then valid project.

  return result.rows[0]!;
}


export const getAllTasksByUserId = async (userId: string, projectId: string): Promise<Task[]> => {
  const query = 
    `SELECT t.*
    FROM 
      tasks t INNER JOIN projects p
      ON t.project_id = p.id
    WHERE 
      p.user_id = $1
      AND
      t.project_id = $2`

  const values = [userId, projectId];

  const result = await db.query<Task>(query, values);

  return result.rows;
}