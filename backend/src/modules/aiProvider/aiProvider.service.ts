import { prisma } from "../../../lib/prisma";

const createProviderDB = async (payload: {
  name: string;
  baseUrl?: string;
  isActive?: boolean;
}) => {
  const exists = await prisma.aIProvider.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (exists) {
    throw new Error("Provider already exists");
  }

  const provider = await prisma.aIProvider.create({
    data: payload,
  });

  return provider;
};

const getAllProviderDB = async () => {
  return await prisma.aIProvider.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      models: true,
    },
  });
};

const getSingleProviderDB = async (id: string) => {
  return await prisma.aIProvider.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      models: true,
    },
  });
};

const updateProviderDB = async (
  id: string,
  payload: {
    name?: string;
    baseUrl?: string;
    isActive?: boolean;
  },
) => {
  await prisma.aIProvider.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return await prisma.aIProvider.update({
    where: {
      id,
    },
    data: payload,
  });
};

const deleteProviderDB = async (id: string) => {
  await prisma.aIProvider.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return await prisma.aIProvider.delete({
    where: {
      id,
    },
  });
};

export const aiProviderService = {
  createProviderDB,
  getAllProviderDB,
  getSingleProviderDB,
  updateProviderDB,
  deleteProviderDB,
};
