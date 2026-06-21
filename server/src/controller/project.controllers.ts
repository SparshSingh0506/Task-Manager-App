import type { Request, Response, NextFunction } from "express";
import { createProjectService } from "../services/project.service.js";
import type { CreateProjectInput } from "../types/dbOperations.interfaces.js";

export const createProjectController = async (req: Request, res: Response) => {
  try {
    const createProjectInput: CreateProjectInput = {
      user_id: req.userId,
      title: req.body.title,
      description: req.body.description
    };

    const createdProjectDetails = await createProjectService(createProjectInput);

    return res.status(201).json({
      message: "Project successfuly created.",
      projectDetails: createdProjectDetails
    })
  }

  catch (error) {
    return res.status(400).json({
      message: "Failed to create Project.",
      error: error
    })
  }
}