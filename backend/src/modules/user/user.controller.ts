import { NextFunction, Response } from "express";
import httpStatus from "http-status";

import { AuthRequest } from "../../middleware/auth";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const userProfile = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await userService.getMyProfileDB(req.user?.id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile retrieved successfully",
      data: result,
    });
  },
);

export const userController = {
  userProfile,
};
