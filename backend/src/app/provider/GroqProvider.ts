import OpenAI from "openai";
import config from "../../config";
import { GenerateResponseInput, GenerateResponseOutput } from "../ai/types";
import { AIProvider } from "./AIProvider";

export class GroqProvider implements AIProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.groq.apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  async generateResponse(
    input: GenerateResponseInput,
  ): Promise<GenerateResponseOutput> {
    console.log("🚀 GroqProvider reached");

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
