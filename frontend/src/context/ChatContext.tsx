import type { ChatContextType } from "@/types/chat";
import { createContext } from "react";

export const ChatContext = createContext<ChatContextType | null>(null);
