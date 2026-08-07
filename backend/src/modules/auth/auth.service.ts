import bcrypt from "bcrypt";
import crypto from "crypto";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { ILogin, IRegister } from "./auth.interface";
import { verifyGoogleToken } from "./google.service";

const generateTokens = (user: {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: string;
}) => {
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginWithGoogle = async (token: string) => {
  const payload = await verifyGoogleToken(token);

  const email = payload.email;

  if (!email || !payload.email_verified) {
    throw new Error("Google email is not verified.");
  }

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const randomPassword = crypto.randomUUID();

    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    user = await prisma.user.create({
      data: {
        name: payload.name ?? "Google User",

        email,

        password: hashedPassword,

        avatar: payload.picture,
      },
    });
  }

  return generateTokens(user);
};

const login = async (payload: ILogin) => {
  const { email, password } = payload;

  const existUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existUser) {
    throw new Error("User doesn't exist, please register first.");
  }

  const passMatch = bcrypt.compareSync(password, existUser.password);

  if (!passMatch) {
    throw new Error("Invalid Credential");
  }

  // const JWTPayload = {
  //   id: existUser.id,
  //   name: existUser.name,
  //   email: existUser.email,
  //   avater: existUser.avatar,
  // };
  // const accessToken = jwtUtils.createToken(
  //   JWTPayload,
  //   config.jwt_access_secret,
  //   config.jwt_access_expires_in,
  // );

  // const refreshToken = jwtUtils.createToken(
  //   JWTPayload,
  //   config.jwt_refresh_secret,
  //   config.jwt_refresh_expires_in,
  // );

  // return {
  //   accessToken,
  //   refreshToken,
  // };

  return generateTokens(existUser);
};
const register = async (payload: IRegister) => {
  const { name, email, password, avater } = payload;

  const existUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existUser) {
    throw new Error("user already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      avater,
    },
  });

  return user;
};
const refreshToken = async (refreshToken: string) => {
  const decodetoken = jwtUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret,
  );

  if (decodetoken.error) {
    throw new Error(decodetoken.error);
  }
  const { id } = decodetoken.data as JwtPayload;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("please logged in again");
  }

  const { accessToken } = generateTokens(user);

  return {
    accessToken,
  };
};
const logout = async () => {
  return null;
};
export const authService = {
  login,
  register,
  refreshToken,
  logout,
  loginWithGoogle,
};
