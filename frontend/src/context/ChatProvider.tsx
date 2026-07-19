import { useCallback, useMemo, useState, type ReactNode } from "react";

import { mockChatApi } from "@/sevices/chat/mockChatApi";
import type { ChatContextType, Message } from "@/types/chat";
import { ChatContext } from "./ChatContext";

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    console.log("1. sendMessage called");
    const text = content.trim();

    if (!text) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    console.log("2. userMessage:", userMessage);
    // Show user message instantly
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Fake API call
      const response = await mockChatApi(text);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Something went wrong. Please try again.",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const value: ChatContextType = useMemo(
    () => ({
      messages,
      sendMessage,
      clearChat,
      isTyping,
    }),
    [messages, sendMessage, clearChat, isTyping],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
