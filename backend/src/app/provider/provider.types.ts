export interface ChatPayload {
  model: string;
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[];
}

export interface ProviderResponse {
  text: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}

export interface IAIProvider {
  generate(payload: ChatPayload): Promise<ProviderResponse>;

  stream?(payload: ChatPayload): Promise<any>;
}
