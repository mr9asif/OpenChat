import { prisma } from "../../../../lib/prisma";
import { AIMessage } from "../../ai/types";
import { ProviderFactory } from "../../provider/ProviderFactory";

const sendMessage = async (message: string) => {
  const aiModel = await prisma.aIModel.findFirst({
    where: {
      isActive: true,
      provider: {
        isActive: true,
      },
    },
    include: {
      provider: true,
    },
    orderBy: {
      priority: "asc",
    },
  });

  if (!aiModel) {
    throw new Error("No active AI model found");
  }

  const provider = ProviderFactory.create(aiModel.provider.name);

  const messages: AIMessage[] = [
    {
      role: "USER",
      content: message,
    },
  ];

  const response = await provider.generateResponse({
    model: aiModel.modelSlug,
    messages,
  });
  console.log("Model:", aiModel.modelSlug);

  return response;
};

export const chatService = {
  sendMessage,
};
