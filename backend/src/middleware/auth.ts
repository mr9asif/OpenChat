import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import config from "../config";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    avater?: string | null;
    role: string;
  };
}

export const auth = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token =
      req.cookies.accessToken ||
      req.headers.authorization ||
      req.headers.authorization?.startsWith("Bearer");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwtUtils.verifyToken(
      token,
      config.jwt_access_secret,
    ) as jwt.JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.data.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      avater: user.avatar,
      role: user.role,
    };

    console.log(req.user);
    next();
  },
);
