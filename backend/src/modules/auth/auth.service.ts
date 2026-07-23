import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { ILogin, IRegister } from "./auth.interface";

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

  const JWTPayload = {
    id: existUser.id,
    name: existUser.name,
    email: existUser.email,
    avater: existUser.avatar,
  };
  const accessToken = jwtUtils.createToken(
    JWTPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  const refreshToken = jwtUtils.createToken(
    JWTPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
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

  const jwtPayload = {
    id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  return { accessToken };
};
const logout = () => {};

export const authService = {
  login,
  register,
  refreshToken,
  logout,
};
