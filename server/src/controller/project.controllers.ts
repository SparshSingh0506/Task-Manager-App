import type { Request, Response, NextFunction } from "express";
import { createProjectService, getAllProjectsService } from "../services/project.service.js";
import type { CreateProjectInput } from "../types/dbOperations.interfaces.js";

export const postProjectController = async (req: Request, res: Response) => {
  const createProjectInput: CreateProjectInput = {
    user_id: req.userId,
    title: req.body.title,
    description: req.body.description
  };

  try {
    const createdProjectDetails = await createProjectService(createProjectInput);

    return res.status(201).json({
      message: "Project successfuly created.",
      projectDetails: createdProjectDetails
    })
  }

  catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Failed to create Project.",
      error: error
    })
  }
}


export const getAllProjectsController = async (req: Request, res: Response) => {
  try {
    const allSummarizedProducts = await getAllProjectsService(req.userId);

    return res.status(200).json({
      message: "All Projects fetched.",
      allProjects: allSummarizedProducts
    })
  }

  catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Failed to fetch Project.",
      error: error
    })
  }
}


export const deleteProjectController = (req: Request, res: Response) => {
  
}