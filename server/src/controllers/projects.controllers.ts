import type { Request, Response } from "express";

import { 
  createProjectService, 
  deleteProjectService, 
  getAllProjectsService, 
  getProjectByIdService 
} from "../services/projects.services.js";

import type { CreateProjectInput } from "../schemas/projects.zod-schemas.js";


export const postProjectController = async (req: Request, res: Response) => {
  const createProjectInput: CreateProjectInput = {
    userId: req.userId,
    ...req.body 
  };

  try {
    const createdProjectDetails = await createProjectService(createProjectInput);

    return res.status(201).json({
      message: "Project successfuly created.",
      projectDetails: createdProjectDetails
    })
  }

  catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "Failed to create Project.",
    })
  }
}


export const getAllProjectsController = async (req: Request, res: Response) => {
  try {
    const summarizedProducts = await getAllProjectsService(req.userId);

    return res.status(200).json({
      message: "All Projects' summary retrieved.",
      projects: summarizedProducts
    })
  }

  catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "Failed to retrieve Project.",
    })
  }
}


export const deleteProjectController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const projectId = req.params.projectId; 

  try {
    const deletedProjectDetails = await deleteProjectService(userId, projectId as string);
    // not sure why TS is also defining type string[] for projectId when its impossible in url param, so using type assertion as a work around.

    return res.status(200).json({
      message: "Project was succesfully deleted.",
      details: deletedProjectDetails
    })
  }

  catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "ProjectId not found.",
    });
  }
}


export const getProjectByIdController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const projectId = req.params.projectId; 

  if (!projectId) {
    return res.status(400).json({
      message: "project id not provided.",
    })
  }

  try {
    const project = await getProjectByIdService(userId, projectId as string);

    return res.status(200).json({
      message: "GET Project succesful.",
      project: project
    })
  }

  catch(error) {
    console.error(error);

    return res.status(400).json({
      message: "ProjectId not found.",
    });
  }
}