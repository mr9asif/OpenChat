import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { prisma } from "../../lib/prisma";
import config from "../config";

import AppError from "../errors/AppError";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    role: string;
  };
}

export const auth = (...requiredRoles: string[]) =>
  catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get Token
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Unauthorized");
    }

    // Verify Token
    const decoded = jwtUtils.verifyToken(
      token,
      config.jwt_access_secret,
    ) as jwt.JwtPayload;

    // Find User
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.data.id,
      },
    });

    if (!user) {
      throw new AppError(401, "User not found");
    }

    // Authorization
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      throw new AppError(403, "You are not authorized to access this resource");
    }

    // Attach user to request
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    };

    next();
  });
