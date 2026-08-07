import { prisma } from "../../../../lib/prisma";
import { ProviderFactory } from "../../provider/ProviderFactory";

export const generateConversationTitle = async (
  conversationId: string,
  modelSlug: string,
  providerName: string,
  message: string,
) => {
  const provider = ProviderFactory.create(providerName);

  const response = await provider.generateResponse({
    model: modelSlug,
    messages: [
      {
        role: "USER",
        content: `
Generate a very short conversation title.

Rules:
- Maximum 5 words.
- No quotation marks.
- No punctuation.
- Return only the title.

User Message:
${message}
        `,
      },
    ],
  });

  await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      title: response.text.trim(),
    },
  });
};
