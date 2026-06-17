import type { Request, Response } from "express";
import { registerUser } from "../services/register.service.js";

export const registerController = async (req: Request, res: Response) => {
  try {
    const createdUserDetails = await registerUser(req.body);

    return res.status(201). json({
      message: "User has been registered",
      userDetails: createdUserDetails
    })
  }

  catch (error) {
    return res.status(409).json({
      message: error
    })
  }
}