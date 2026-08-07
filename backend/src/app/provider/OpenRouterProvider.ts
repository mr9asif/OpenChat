import OpenAI from "openai";
import config from "../../config";
import { GenerateResponseInput, GenerateResponseOutput } from "../ai/types";
import { AIProvider } from "./AIProvider";

export class OpenRouterProvider implements AIProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openRouter.apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });
  }

  async generateResponse(
    input: GenerateResponseInput,
  ): Promise<GenerateResponseOutput> {
    console.log("🚀 OpenRouterProvider reached");

    const completion = await this.client.chat.completions.create({
      model: input.model,
      messages: input.messages.map((msg) => ({
        role: msg.role.toLowerCase() as "user" | "assistant" | "system",
        content: msg.content,
      })),
    });

    return {
      text: completion.choices[0]?.message?.content ?? "",

      promptTokens: completion.usage?.prompt_tokens ?? 0,

      completionTokens: completion.usage?.completion_tokens ?? 0,

      totalTokens: completion.usage?.total_tokens ?? 0,
    };
  }

  async *streamResponse(input: GenerateResponseInput): AsyncIterable<string> {
    console.log("🚀 OpenRouter Streaming Started");

    const stream = await this.client.chat.completions.create({
      model: input.model,

      messages: input.messages.map((msg) => ({
        role: msg.role.toLowerCase() as "user" | "assistant" | "system",

        content: msg.content,
      })),

      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        yield content;
      }
    }
  }
}
