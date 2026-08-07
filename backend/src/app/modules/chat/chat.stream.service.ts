import { Response } from "express";
import { prisma } from "../../../../lib/prisma";

import { ProviderFactory } from "../../provider/ProviderFactory";

import {
  getOrCreateConversation,
  loadConversationMessages,
  saveAssistantMessage,
  saveUsage,
  saveUserMessage,
} from "./chat.helpers";

import { SendMessagePayload } from "./chat.types";

const streamMessage = async (payload: SendMessagePayload, res: Response) => {
  const { userId, message, conversationId, modelId } = payload;
  console.log("🔥 STREAM SERVICE RUNNING");
  console.log(payload);
  console.log("message =", message);
  // 1. Conversation
  const conversation = await getOrCreateConversation(userId, conversationId);

  // 2. Save user message
  await saveUserMessage(conversation.id, message);

  // 3. Load history
  const messages = await loadConversationMessages(conversation.id);

  // 4. Select Model
  let selectedModel;

  if (modelId) {
    selectedModel = await prisma.aIModel.findUnique({
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
  } else {
    selectedModel = await prisma.aIModel.findFirst({
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

    if (!selectedModel) {
      throw new Error("No active model found");
    }
  }

  // 5. Provider
  const provider = ProviderFactory.create(selectedModel.provider.name);

  // 6. Headers
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  // 7. Stream
  for await (const chunk of provider.streamResponse({
    model: selectedModel.modelSlug,
    messages,
  })) {
    console.log(chunk);
    fullResponse += chunk;

    res.write(chunk);
  }

  // 8. Save Assistant Message
  await saveAssistantMessage(conversation.id, fullResponse, selectedModel.id);

  // 9. Save Usage
  // (Streaming token usage পরে add করব)
  await saveUsage(userId, conversation.id, selectedModel.id, {
    text: fullResponse,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
  });

  // 10. End Stream
  res.end();
};

export const chatStreamService = {
  streamMessage,
};
