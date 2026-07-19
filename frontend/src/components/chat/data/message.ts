import type { Message } from "@/utils/chat";

export const messages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! 👋 How can I help you today?",
    createdAt: new Date(),
  },
  {
    id: "2",
    role: "user",
    content: "Explain React Query in simple words.",
    createdAt: new Date(),
  },
  {
    id: "3",
    role: "assistant",
    content:
      "React Query is a library that helps you fetch, cache, and synchronize server data efficiently.",
    createdAt: new Date(),
  },
];
