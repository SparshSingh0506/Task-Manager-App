import type { User } from "../types/schema.interfaces.js";
import type { CreateUserInput } from "../types/dbOperations.interfaces.js";
import { db } from "../config/db.config.js";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await db.query(
    `SELECT * FROM users 
    WHERE email = $1`
    , [email]);
  // no string interpolation to prevent SQL injection! like ' OR 1=1 -- which can provide unauthorized access: SELECT * FROM users WHERE email = '' OR 1=1 --'

  return result.rows[0] ?? null; // email is always unique
}


type CreatedUser = Pick<User, 'id' | 'username' | 'email' | 'created_at'>; // using pick instead of omit, so that future schema fields not needed here are not included

export const createUser = async ({ username, email, password_hash }: CreateUserInput): Promise<CreatedUser> => {
  const result = await db.query(
    `INSERT INTO users (
      username, 
      email, 
      password_hash
    ) 
    VALUES ($1, $2, $3) 
    RETURNING 
      id, 
      username, 
      email, 
      created_at`
    , [username, email, password_hash]
  );

  // pg can throw error if user already exists.
  // although unique user is checked in auth service, but due to race condition if same email is posted at the same time, error can occur.
  return result.rows[0] as CreatedUser;
}



