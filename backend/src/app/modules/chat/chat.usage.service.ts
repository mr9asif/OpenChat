import { prisma } from "../../../../lib/prisma";

const getUsage = async (userId: string) => {
  // Today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Total Usage
  const totalUsage = await prisma.usage.aggregate({
    where: {
      userId,
    },
    _sum: {
      totalTokens: true,
    },
    _count: {
      id: true,
    },
  });

  // Today's Usage
  const todayUsage = await prisma.usage.aggregate({
    where: {
      userId,
      createdAt: {
        gte: today,
      },
    },
    _sum: {
      totalTokens: true,
    },
    _count: {
      id: true,
    },
  });

  // Usage Per Model
  const modelUsage = await prisma.usage.groupBy({
    by: ["modelId"],

    where: {
      userId,
    },

    _count: {
      id: true,
    },

    _sum: {
      totalTokens: true,
    },
  });

  const models = await Promise.all(
    modelUsage.map(async (item) => {
      const model = await prisma.aIModel.findUnique({
        where: {
          id: item.modelId,
        },
      });

      return {
        id: model?.id,
        name: model?.name,

        messages: item._count.id,

        tokens: item._sum.totalTokens ?? 0,
      };
    }),
  );

  // Favorite Model
  const favoriteModel =
    models.length > 0
      ? [...models].sort((a, b) => b.messages - a.messages)[0]
      : null;

  return {
    todayMessages: todayUsage._count.id,

    totalMessages: totalUsage._count.id,

    todayTokens: todayUsage._sum.totalTokens ?? 0,

    totalTokens: totalUsage._sum.totalTokens ?? 0,

    favoriteModel,

    modelUsage: models,
  };
};

export const chatUsageService = {
  getUsage,
};
