// export type AIMessageRole = "system" | "user" | "assistant";

import { MessageRole } from "../../../generated/prisma/enums";

export interface AIMessage {
  role: MessageRole;
  content: string;
}

export interface GenerateResponseInput {
  model: string;
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface GenerateResponseOutput {
  text: string;

  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}
