import type { NextFunction, Request, Response } from "express";
import type { CreateProjectInput, PatchProjectSchema } from "../schemas/projects.zod-schemas.js";

import { 
  createProjectService, 
  deleteProjectService, 
  getAllProjectsService, 
  getProjectByIdService, 
  patchProjectService
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


export const getProjectByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId as string; 
  // no need to check projectId exists as it has to be present in the url, otherwise /projects/:projectId/tasks without projectId would lead to invalid route.
  // not sure why TS is also defining type string[] for projectId when its impossible in url param, so using string type assertion as a work around.

  try {
    const projectDetails = await getProjectByIdService(userId, projectId);
    
    return res.status(200).json({
      message: "Project retrieved successfully.",
      projectDetails: projectDetails
    })
  }
  
  catch(error) {
    next(error);
  }
}


export const deleteProjectController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId as string; 

  try {
    const deletedProjectDetails = await deleteProjectService(userId, projectId);

    return res.status(200).json({
      message: "Project deleted succesfully.",
      projectDetails: deletedProjectDetails
    })
  }

  catch (error) {
    next(error);
  }
}


export const patchProjectController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const projectId = req.params.projectId as string; 
  const updates: PatchProjectSchema = req.body;

  try {
    const patchedProjectDetails = await patchProjectService(userId, projectId, updates);

    return res.status(200).json({
      message: "Project updated succesfully.",
      projectDetails: patchedProjectDetails
    })
  }

  catch (error) {
    next(error);
  }
}

