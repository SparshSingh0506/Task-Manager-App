import type { User } from "../types/schema.interfaces.js";
import { db } from "../config/db.config.js";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const query =
    `SELECT * FROM users 
    WHERE email = $1`;

  const values = [email];

  const result = await db.query(query, values);

  return result.rows[0] ?? null;
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

  const result = await db.query<CreatedUser>(query, values);

  return result.rows[0]!;
}



