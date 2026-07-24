import { prisma } from "../../../lib/prisma";

const createModelDB = async (payload: any) => {
  // Check provider exists
  const provider = await prisma.aIProvider.findUnique({
    where: {
      id: payload.providerId,
    },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  // Check duplicate model
  const existingModel = await prisma.aIModel.findFirst({
    where: {
      providerId: payload.providerId,
      modelSlug: payload.modelSlug,
    },
  });

  if (existingModel) {
    throw new Error("This model already exists for this provider");
  }

  // Create model
  const result = await prisma.aIModel.create({
    data: payload,
    include: {
      provider: true,
    },
  });

  return result;
};

const getAllModelsDB = async () => {
  const result = await prisma.aIModel.findMany({
    include: {
      provider: true,
    },
    orderBy: {
      priority: "asc",
    },
  });

  return result;
};

const getSingleModelDB = async (id: string) => {
  const result = await prisma.aIModel.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      provider: true,
    },
  });

  return result;
};

const updateModelDB = async (id: string, payload: any) => {
  // Model exists?
  await prisma.aIModel.findUniqueOrThrow({
    where: {
      id,
    },
  });

  // If providerId is changing, check provider exists
  if (payload.providerId) {
    const provider = await prisma.aIProvider.findUnique({
      where: {
        id: payload.providerId,
      },
    });

    if (!provider) {
      throw new Error("Provider not found");
    }
  }

  // If providerId or modelSlug changes, check duplicate
  if (payload.providerId || payload.modelSlug) {
    const currentModel = await prisma.aIModel.findUniqueOrThrow({
      where: { id },
    });

    const providerId = payload.providerId ?? currentModel.providerId;
    const modelSlug = payload.modelSlug ?? currentModel.modelSlug;

    const duplicate = await prisma.aIModel.findFirst({
      where: {
        providerId,
        modelSlug,
        NOT: {
          id,
        },
      },
    });

    if (duplicate) {
      throw new Error("This model already exists for this provider");
    }
  }

  const result = await prisma.aIModel.update({
    where: {
      id,
    },
    data: payload,
    include: {
      provider: true,
    },
  });

  return result;
};

const deleteModelDB = async (id: string) => {
  // Check model exists
  await prisma.aIModel.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.aIModel.delete({
    where: {
      id,
    },
  });

  return result;
};

export const aiModelService = {
  createModelDB,
  getAllModelsDB,
  getSingleModelDB,
  updateModelDB,
  deleteModelDB,
};
