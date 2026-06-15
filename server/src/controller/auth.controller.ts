import type { Request, Response } from "express";

export const registerHandler = async (req: Request, res: Response) => {
  const {username, email, password} = req.body;
  console.log("Succesfully passed validation and reached the register handler!");
}