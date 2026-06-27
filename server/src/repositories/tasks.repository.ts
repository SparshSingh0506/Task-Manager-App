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

  const result = await db.query( 
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

    RETURNING *`
    , [userId, projectId, title, description, status, priority, due_date]
  )
  // a little confusing query O.o | Select is executed before insert, FROM projects only returns p.id, $3...$7 are treated as constants not taken from projects table.

  return (result.rowCount !== 0) ? result.rows[0] as Task : null;
}