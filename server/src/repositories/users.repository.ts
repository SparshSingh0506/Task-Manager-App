import type { User } from "../types/schema.interfaces.js";
import { db } from "../config/db.config.js";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const query =
    `SELECT * FROM users 
    WHERE email = $1`;

  const values = [email];

  const result = await db.query(query, values);
  // no string interpolation to prevent SQL injection! like ' OR 1=1 -- which can provide unauthorized access: SELECT * FROM users WHERE email = '' OR 1=1 --'

  return result.rows[0] ?? null; // email is always unique
}


type CreateUserInput = Pick<User, 'username' | 'email'> & {passwordHash: string}
type CreatedUser = Omit<User, 'password_hash'>

export const createUser = async (createUserInput: CreateUserInput): Promise<CreatedUser> => {
  const { username, email, passwordHash } = createUserInput;

  const query = 
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
      created_at`;

  const values = [username, email, passwordHash]

  const result = await db.query(query, values);

  // pg can throw error if user already exists.
  // although unique user is checked in auth service, but due to race condition if same email is posted at the same time, error can occur.
  return result.rows[0] as CreatedUser;
}



