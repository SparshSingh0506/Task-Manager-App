import { findUserByEmail } from "../repositories/user.repository.js";
import type { UserLogin } from "../schemas/login.zod-schema.js";
import bcrypt from "bcryptjs";

export const loginUser = async ({ email, password }: UserLogin) => {
  // find if user exists by email
  const existingUser = await findUserByEmail(email);

  if (!existingUser) throw new Error("User not registered!");

  // hash password

  if (await bcrypt.compare(password, existingUser.password_hash)) {
    // generate jwt
  } // auto hashes login password
}