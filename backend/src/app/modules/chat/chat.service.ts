import { AIMessage } from "../../ai/types";
import { ProviderFactory } from "../../provider/ProviderFactory";

const sendMessage = async (message: string) => {
  // পরে Database থেকে আসবে
  const providerName = "Gemini";
  const model = "gemini-2.5-flash";

  const provider = ProviderFactory.create(providerName);

  const messages: AIMessage[] = [
    {
      role: "USER",
      content: message,
    },
  ];

  const response = await provider.generateResponse({
    model,
    messages,
  });

  return response;
};

export const chatService = {
  sendMessage,
};
