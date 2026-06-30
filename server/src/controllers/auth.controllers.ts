import type { Request, Response, NextFunction } from "express";

import { registerUserService } from "../services/auth.services.js";
import { loginUserService } from "../services/auth.services.js";


export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdUserDetails = await registerUserService(req.body);

    return res.status(201).json({
      message: "User registered successfully.",
      userDetails: createdUserDetails
    });
  }

  catch (error: any) {
    next(error);
  }
}


export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = await loginUserService(req.body);

    res.status(200).json({
      message: "accessToken successfully generated and sent.",
      accessToken: accessToken
    });
  }

  catch (error) {
    next(error);
  }
}