import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { aiProviderService } from "./aiProvider.service";

const createProvider = catchAsync(async (req, res) => {
  const result = await aiProviderService.createProviderDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Provider created successfully",
    data: result,
  });
});

const getAllProvider = catchAsync(async (req, res) => {
  const result = await aiProviderService.getAllProviderDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Providers retrieved successfully",
    data: result,
  });
});

const getSingleProvider = catchAsync(async (req, res) => {
  const result = await aiProviderService.getSingleProviderDB(
    req.params.id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Provider retrieved successfully",
    data: result,
  });
});

const updateProvider = catchAsync(async (req, res) => {
  const result = await aiProviderService.updateProviderDB(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Provider updated successfully",
    data: result,
  });
});

const deleteProvider = catchAsync(async (req, res) => {
  const result = await aiProviderService.deleteProviderDB(
    req.params.id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Provider deleted successfully",
    data: result,
  });
});

export const aiProviderController = {
  createProvider,
  getAllProvider,
  getSingleProvider,
  updateProvider,
  deleteProvider,
};
