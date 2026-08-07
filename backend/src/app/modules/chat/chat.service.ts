import { prisma } from "../../../../lib/prisma";
import { GroqProvider } from "../../provider/GroqProvider";

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

  // const provider = ProviderFactory.create(aiModel.provider.name);

  // const messages: AIMessage[] = [
  //   {
  //     role: "USER",
  //     content: message,
  //   },
  // ];

  // const response = await provider.generateResponse({
  //   model: aiModel.modelSlug,
  //   messages,
  // });
  console.log("Model:", aiModel.modelSlug);

  const provider = new GroqProvider();

  const result = await provider.generateResponse(
    "llama-3.1-8b-instant",
    message,
  );

  console.log(result);
  return result;
  // return response;
};

export const chatService = {
  sendMessage,
};
