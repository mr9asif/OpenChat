import { MessageRole } from "../../../../generated/prisma/enums";
import { prisma } from "../../../../lib/prisma";
import { AIMessage } from "../../ai/types";
import { ProviderFactory } from "../../provider/ProviderFactory";
import { SendMessagePayload } from "./chat.types";

// create conversation
const getOrCreateConversation = async (
  userId: string,
  conversationId?: string,
) => {
  if (conversationId) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
        userId,
      },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return conversation;
  }

  return prisma.conversation.create({
    data: {
      title: "New Chat",
      userId,
    },
  });
};

// save user messages...

const saveUserMessage = async (conversationId: string, content: string) => {
  return prisma.message.create({
    data: {
      conversationId,
      role: MessageRole.USER,
      content,
    },
  });
};

// load conversation messages

const loadConversationMessages = async (
  conversationId: string,
): Promise<AIMessage[]> => {
  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
};

const saveAssistantMessage = async (
  conversationId: string,
  content: string,
  modelId?: string,
) => {
  return prisma.message.create({
    data: {
      conversationId,
      role: MessageRole.ASSISTANT,
      content,
      modelId,
    },
  });
};

const sendMessage = async (payload: SendMessagePayload) => {
  const { userId, message, modelId, conversationId } = payload;

  console.log("🔥 NEW CHAT SERVICE RUNNING");

  // Get or Create Conversation
  const conversation = await getOrCreateConversation(userId, conversationId);

  // Save User Message
  await saveUserMessage(conversation.id, message);

  // Load Full Conversation History
  const messages = await loadConversationMessages(conversation.id);

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
    await saveAssistantMessage(
      conversation.id,
      response.text,
      selectedModel.id,
    );
    return {
      conversationId: conversation.id,
      provider: selectedModel.provider.name,
      model: {
        id: selectedModel.id,
        name: selectedModel.name,
        slug: selectedModel.modelSlug,
      },
      message: response.text,
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

      await saveAssistantMessage(conversation.id, response.text, model.id);

      return {
        conversationId: conversation.id,
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

// get conversations
const getConversations = async (userId: string) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return conversations;
};

// getCoversation messages
const getConversationMessages = async (
  conversationId: string,
  userId: string,
) => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          role: true,
          content: true,
          createdAt: true,
          modelId: true,
        },
      },
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  return conversation;
};

export const chatService = {
  sendMessage,
  getAvailableModels,
  getConversations,
  getConversationMessages,
};
