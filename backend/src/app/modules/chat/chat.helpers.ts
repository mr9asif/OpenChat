import { MessageRole } from "../../../../generated/prisma/enums";
import { prisma } from "../../../../lib/prisma";
import { AIMessage, GenerateResponseOutput } from "../../ai/types";

// create conversation
export const getOrCreateConversation = async (
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

export const saveUserMessage = async (
  conversationId: string,
  content: string,
) => {
  return prisma.message.create({
    data: {
      conversationId,
      role: MessageRole.USER,
      content,
    },
  });
};

// load conversation messages

export const loadConversationMessages = async (
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

export const saveAssistantMessage = async (
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

// usage
export const saveUsage = async (
  userId: string,
  conversationId: string,
  modelId: string,
  response: GenerateResponseOutput,
) => {
  await prisma.usage.create({
    data: {
      userId,
      conversationId,
      modelId,

      promptTokens: response.promptTokens ?? 0,
      completionTokens: response.completionTokens ?? 0,
      totalTokens: response.totalTokens ?? 0,
    },
  });
};
