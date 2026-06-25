import type { Request, Response } from "express";
import { createProjectService, deleteProjectService, getAllProjectsService, getProjectByIdService } from "../services/projects.services.js";
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
      message: "All Projects' summary fetched.",
      projects: allSummarizedProducts
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


export const deleteProjectController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const projectId = req.params.projectId; 

  if (!projectId) {
    return res.status(400).json({
      message: "project id not provided.",
    })
  }

  try {
    const deletedProjectDetails = await deleteProjectService(userId, projectId as string);
    // not sure why TS is also defining type string[] for projectId when its impossible in url param, so using type assertion as a work around.

    return res.status(200).json({
      message: "Project was succesfully deleted.",
      details: deletedProjectDetails
    })
  }

  catch (error) {
    console.log(error);

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
    console.log(error);

    return res.status(400).json({
      message: "ProjectId not found.",
    });
  }
}