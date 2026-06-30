import type { NextFunction, Request, Response } from "express";
import type { CreateProjectInput } from "../schemas/projects.zod-schemas.js";

import { 
  createProjectService, 
  deleteProjectService, 
  getAllProjectsService, 
  getProjectByIdService 
} from "../services/projects.services.js";


export const postProjectController = async (req: Request, res: Response, next: NextFunction) => {
  const createProjectInput: CreateProjectInput = {
    userId: req.userId,
    ...req.body 
  };

  try {
    const createdProjectDetails = await createProjectService(createProjectInput);

    return res.status(201).json({
      message: "Project created successfully.",
      projectDetails: createdProjectDetails
    })
  }

  catch (error) {
    next(error);
  }
}


export const getAllProjectsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProjectsDetails = await getAllProjectsService(req.userId);

    return res.status(200).json({
      message: "All Projects retrieved successfully.",
      projects: allProjectsDetails
    })
  }

  catch (error) {
    next(error);
  }
}


export const deleteProjectController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId; 
  // no need to check projectId exists as it has to be present in the url, otherwise /projects/:projectId/tasks without projectId would lead to invalid route.

  try {
    const deletedProjectDetails = await deleteProjectService(userId, projectId as string);
    // not sure why TS is also defining type string[] for projectId when its impossible in url param, so using string type assertion as a work around.

    return res.status(200).json({
      message: "Project deleted succesfully.",
      projectDetails: deletedProjectDetails
    })
  }

  catch (error) {
    next(error);
  }
}


export const getProjectByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId; 

  try {
    const project = await getProjectByIdService(userId, projectId as string);

    return res.status(200).json({
      message: "Project retrieved successfully.",
      project: project
    })
  }

  catch(error) {
    next(error);
  }
}