import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { aiModelService } from "./aiModel.service";

const createModel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await aiModelService.createModelDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "AI Model created successfully",
      data: result,
    });
  },
);

const getAllModels = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await aiModelService.getAllModelsDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "AI Models retrieved successfully",
      data: result,
    });
  },
);

const getSingleModel = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await aiModelService.getSingleModelDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "AI Model retrieved successfully",
    data: result,
  });
});

const updateModel = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await aiModelService.updateModelDB(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "AI Model updated successfully",
    data: result,
  });
});

const deleteModel = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await aiModelService.deleteModelDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "AI Model deleted successfully",
    data: result,
  });
});

export const aiModelController = {
  createModel,
  getAllModels,
  getSingleModel,
  updateModel,
  deleteModel,
};
