import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { IRegister } from "./auth.interface";

const login = () => {};
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
const refreshToken = () => {};
const logout = () => {};

export const authService = {
  login,
  register,
  refreshToken,
  logout,
};
