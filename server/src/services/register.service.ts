import { findUserByEmail, createUser  } from "../repositories/user.repository.js";
import type { UserRegistration } from "../schemas/register.zod-schema.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({username, email, password}: UserRegistration) => {
  // check user already resgistered by email
  const existingUser = await findUserByEmail(email);

  if (existingUser) throw new Error ("this email already exists!");

  // hash password
  const password_hash = await bcrypt.hash(password, 10);

  // insert in db
  return await createUser({username, email, password_hash});
}