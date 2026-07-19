export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: Date;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  isTyping: boolean;
}
