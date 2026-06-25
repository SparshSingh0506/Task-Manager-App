import 'dotenv/config';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { UserRegistration, UserLogin } from "../schemas/auth.zod-schemas.js";

import { findUserByEmail, createUser } from "../repositories/users.repository.js";


export const registerUserService = async ({ username, email, password }: UserRegistration) => {
  // check user already resgistered by email
  const existingUser = await findUserByEmail(email);

  if (existingUser) throw new Error("this email already exists!");

  // hash password
  const password_hash = await bcrypt.hash(password, 10);

  // insert in db
  return await createUser({ username, email, password_hash });
}



export const loginUserService = async ({ email, password }: UserLogin) => {
  // check user exists by email
  const foundUser = await findUserByEmail(email);
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