import 'dotenv/config';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { UserRegistrationInput, UserLoginInput } from "../schemas/auth.zod-schemas.js";

import { getUserByEmail, createUser } from "../repositories/users.repository.js";


export const registerUserService = async ({ username, email, password }: UserRegistrationInput) => {
  // check if user is already resgistered by email
  const existingUser = await getUserByEmail(email);

  if (existingUser) throw new Error("this email already exists!");

  // hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // insert in db
  return await createUser({ username, email, passwordHash });
}


export const loginUserService = async ({ email, password }: UserLoginInput) => {
  // check user exists by email
  const foundUser = await getUserByEmail(email);
  if (!foundUser) throw new Error("Invalid Credentials");

  // check password
  const passwordMatched = await bcrypt.compare(password, foundUser.password_hash);
  if (!passwordMatched) throw new Error("Invalid Credentials");

  //generate jwt
  const token = jwt.sign({
    sub: foundUser.id  // the client will always pass this id as payload in the token now, which is easily queryable to get all details.
  }, process.env.JWT_SECRET!);

  return token;
}