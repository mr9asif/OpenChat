import OpenAI from "openai";
import config from "../../config";

export class GroqProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.groq.apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  async generateResponse(model: string, message: string) {
    const response = await this.client.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return {
      content: response.choices[0]?.message?.content ?? "",
      usage: response.usage,
    };
  }
}
