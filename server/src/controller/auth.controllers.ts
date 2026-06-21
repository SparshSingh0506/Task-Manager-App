import type { Request, Response } from "express";

import { registerUserService } from "../services/auth.services.js";
import { loginUserService } from "../services/auth.services.js";


export const registerController = async (req: Request, res: Response) => {
  try {
    const createdUserDetails = await registerUserService(req.body);

    return res.status(201).json({
      message: "User has been registered",
      userDetails: createdUserDetails
    })
  }

  catch (error) {
    return res.status(409).json({
      message: "this email already exists",
      error: error
    })
  }
}


export const loginController = async (req: Request, res: Response) => {
  try {
    const accessToken = await loginUserService(req.body);

    res.status(200).json({
      message: "accessToken successfully generated and sent.",
      accessToken: accessToken
    })
  }

  catch (error) {
    return res.status(401).json({
      message: "Invalid Credentials.",
      error: error
    })
  }
}