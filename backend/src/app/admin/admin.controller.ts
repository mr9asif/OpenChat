import { Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { adminService } from "./admin.service";

const getDashboard = catchAsync(async (req, res: Response) => {
  const result = await adminService.getDashboard();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Dashboard fetched successfully",
    data: result,
  });
});

export const adminController = {
  getDashboard,
};
