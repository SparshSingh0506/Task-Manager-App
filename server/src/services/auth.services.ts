import 'dotenv/config';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { UserRegistrationInput, UserLoginInput } from "../schemas/auth.zod-schemas.js";

import { getUserByEmail, createUser } from "../repositories/users.repository.js";


export const registerUserService = async ({ username, email, password }: UserRegistrationInput) => {
  const user = await getUserByEmail(email);

  if (user) throw {
    status: 409,
    message: "Email already exists."
  };

  const passwordHash = await bcrypt.hash(password, 10);

  return await createUser({ username, email, passwordHash });
}


export const loginUserService = async ({ email, password }: UserLoginInput) => {
  const user = await getUserByEmail(email);

  if (!user) throw {
    status: 401,
    message: "Invalid Credentials."
  };

  const passwordMatched = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatched) throw {
    status: 401,
    message: "Invalid Credentials."
  }

  //generate jwt
  const token = jwt.sign({
    sub: user.id  // the client will always pass this id as payload in the token now, which is easily queryable to get all details.
  }, process.env.JWT_SECRET!);

  return token;
}