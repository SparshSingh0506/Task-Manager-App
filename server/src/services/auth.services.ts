import { env } from '../config/env.config.js';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { UserRegistrationInput, UserLoginInput } from "../schemas/auth.zod-schemas.js";

import { getUserByEmail, createUser } from "../repositories/users.repository.js";
import { AppError } from "../utils/errors/errors.util.js";


export const registerUserService = async ({ username, email, password }: UserRegistrationInput) => {
  const user = await getUserByEmail(email);

  if (user) throw new AppError(409, "Email already exists.");

  const passwordHash = await bcrypt.hash(password, 10);

  return await createUser({ username, email, passwordHash });
}


export const loginUserService = async ({ email, password }: UserLoginInput) => {
  const user = await getUserByEmail(email);

  if (!user) throw new AppError(401, "Invalid Credentials.");

  const passwordMatched = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatched) throw new AppError(401, "Invalid Credentials.");

  const token = jwt.sign({
    sub: user.id
  }, env.JWT_SECRET);

  return token;
}