import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await authService.register(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Register Successfully",
      data: { result },
    });
  },
);

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.login(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, //1d
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, //7d
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user logged in sucessfully",
      data: { accessToken, refreshToken },
    });
  },
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshToken(token);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "token refresh successfully",
      data: { accessToken },
    });
  },
);

const logout = catchAsync(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logout successful",
    data: null,
  });
});

const googleLogin = catchAsync(async (req, res) => {
  const { token } = req.body;

  const result = await authService.loginWithGoogle(token);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Google login successful",
    data: {
      accessToken: result.accessToken,
    },
  });
});
export const authController = {
  register,
  loginUser,
  refreshToken,
  logout,
  googleLogin,
};
