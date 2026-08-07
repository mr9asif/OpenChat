import { prisma } from "../../../../lib/prisma";
import { AIMessage } from "../../ai/types";
import { ProviderFactory } from "../../provider/ProviderFactory";
import { SendMessagePayload } from "./chat.types";

const sendMessage = async (payload: SendMessagePayload) => {
  const { message, modelId } = payload;
  console.log("🔥 NEW CHAT SERVICE RUNNING");

  const messages: AIMessage[] = [
    {
      role: "USER",
      content: message,
    },
  ];

  /**
   * ==================================================
   * User Selected Model
   * ==================================================
   */
  if (modelId) {
    const selectedModel = await prisma.aIModel.findUnique({
      where: {
        id: modelId,
      },
      include: {
        provider: true,
      },
    });

    if (!selectedModel) {
      throw new Error("Selected model not found");
    }

    const provider = ProviderFactory.create(selectedModel.provider.name);

    console.log(
      `🎯 User Selected -> ${selectedModel.provider.name} | ${selectedModel.name}`,
    );

    const response = await provider.generateResponse({
      model: selectedModel.modelSlug,
      messages,
    });

    return {
      provider: selectedModel.provider.name,
      model: {
        id: selectedModel.id,
        name: selectedModel.name,
        slug: selectedModel.modelSlug,
      },
      message: response,
    };
  }

  /**
   * ==================================================
   * Auto Mode (Priority + Fallback)
   * ==================================================
   */
  const activeModels = await prisma.aIModel.findMany({
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

  if (!activeModels.length) {
    throw new Error("No active AI model found");
  }

  for (const model of activeModels) {
    try {
      console.log(`🚀 Trying -> ${model.provider.name} | ${model.name}`);

      const provider = ProviderFactory.create(model.provider.name);

      const response = await provider.generateResponse({
        model: model.modelSlug,
        messages,
      });

      return {
        provider: model.provider.name,
        model: {
          id: model.id,
          name: model.name,
          slug: model.modelSlug,
        },
        message: response.text,
      };
    } catch (error: any) {
      console.error(`❌ Failed -> ${model.provider.name} | ${model.modelSlug}`);

      console.error(error.response?.data);
      console.error(error.message);

      continue;
    }
  }

  throw new Error("All AI models failed.");
};

// get available models
const getAvailableModels = async () => {
  const models = await prisma.aIModel.findMany({
    where: {
      isActive: true,
      isFree: true,
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

  return models.map((model) => ({
    id: model.id,
    name: model.name,
    provider: model.provider.name,
  }));
};

export const chatService = {
  sendMessage,
  getAvailableModels,
};
