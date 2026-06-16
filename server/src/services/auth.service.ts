import { findUserByEmail, createUser  } from "../repositories/user.repository.js";
import type { UserRegistration } from "../schemas/register.schema.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({username, email, password}: UserRegistration) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) throw new Error ("Email already exists!");


  const password_hash = await bcrypt.hash(password, 10);

  
  try {
    return await createUser({username, email, password_hash});
  }

  catch (error) {
    console.log(error);
  }
}