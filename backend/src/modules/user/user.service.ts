import { prisma } from "../../../lib/prisma";

const getMyProfileDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });

  if (!user) {
    throw new Error("user doesn't exist. please logged in");
  }

  return user;
};

export const userService = {
  getMyProfileDB,
};
