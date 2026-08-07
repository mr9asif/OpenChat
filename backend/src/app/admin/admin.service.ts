import { prisma } from "../../../lib/prisma";

const getDashboard = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    users,
    conversations,
    messages,

    providers,
    activeProviders,

    models,
    activeModels,
    freeModels,

    totalUsage,
    todayUsage,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.conversation.count(),

    prisma.message.count(),

    prisma.aIProvider.count(),

    prisma.aIProvider.count({
      where: {
        isActive: true,
      },
    }),

    prisma.aIModel.count(),

    prisma.aIModel.count({
      where: {
        isActive: true,
      },
    }),

    prisma.aIModel.count({
      where: {
        isFree: true,
      },
    }),

    prisma.usage.aggregate({
      _sum: {
        totalTokens: true,
      },
    }),

    prisma.usage.aggregate({
      where: {
        createdAt: {
          gte: today,
        },
      },

      _sum: {
        totalTokens: true,
      },
    }),
  ]);

  return {
    users,

    conversations,

    messages,

    providers: {
      total: providers,
      active: activeProviders,
    },

    models: {
      total: models,
      active: activeModels,
      free: freeModels,
    },

    usage: {
      totalTokens: totalUsage._sum.totalTokens ?? 0,

      todayTokens: todayUsage._sum.totalTokens ?? 0,
    },
  };
};

export const adminService = {
  getDashboard,
};
