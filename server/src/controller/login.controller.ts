import type { Request, Response } from "express";
import { loginUser } from "../services/login.service.js";

export const loginController = async (req: Request, res: Response) => {
  try {
    const accessToken = await loginUser(req.body);

    res.status(200).json({
      message: "accessToken successfully generated and sent.",
      accessToken: accessToken
    })
  }

  catch (error) {
    return res.status(401).json({
      message: "Invalid Credentials."
    })
  }
}