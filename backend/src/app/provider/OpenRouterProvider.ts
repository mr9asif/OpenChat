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

    const response = await this.client.chat.completions.create({
      model: input.model,
      messages: input.messages.map((msg) => ({
        role: msg.role.toLowerCase() as "user" | "assistant" | "system",
        content: msg.content,
      })),
    });

    return {
      text: response.choices[0]?.message?.content ?? "",
    };
  }
}
