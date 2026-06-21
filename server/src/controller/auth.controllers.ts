import type { Request, Response } from "express";

import { registerUser } from "../services/auth.services.js";
import { loginUser } from "../services/auth.services.js";


export const registerController = async (req: Request, res: Response) => {
  try {
    const createdUserDetails = await registerUser(req.body);

    return res.status(201).json({
      message: "User has been registered",
      userDetails: createdUserDetails
    })
  }

  catch (error) {
    return res.status(409).json({
      message: "this email already exists"
    })
  }
}


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