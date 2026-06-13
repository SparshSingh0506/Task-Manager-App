import type { Request, Response } from "express";

export const registerHandler = async (req: Request, res: Response) => {
  const {username, email, password} = req.body;

  
}