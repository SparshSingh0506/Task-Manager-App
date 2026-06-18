import 'dotenv/config';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { UserLogin } from "../schemas/login.zod-schema.js";
import { findUserByEmail } from "../repositories/user.repository.js";

export const loginUser = async ({ email, password }: UserLogin) => {
  // check user exists by email
  const foundUser = await findUserByEmail(email);
  if (!foundUser) throw new Error("Invalid Credentials");

  // cpmpare password
  const passwordMatched = await bcrypt.compare(password, foundUser.password_hash);
  if (!passwordMatched) throw new Error("Invalid Credentials");

  //generate jwt
  const token = jwt.sign({
    sub: foundUser.id  // the client will always pass this id in the token now, which is easily queryable to get all details.
  }, process.env.JWT_SECRET!);

  return token;
}