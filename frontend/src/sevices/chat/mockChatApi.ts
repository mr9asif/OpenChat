const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockChatApi = async (message: string): Promise<string> => {
  await delay(1500);

  const responses = [
    `You said: "${message}"`,
    `I received your message: "${message}"`,
    `Thanks for your message! You wrote: "${message}"`,
    `This is a mock AI response for: "${message}"`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};
