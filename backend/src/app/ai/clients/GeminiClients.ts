import axios, { AxiosInstance } from "axios";
import config from "../../../config";
import { GenerateResponseInput } from "../types";

export class GeminiClients {
  private client: AxiosInstance;

  constructor() {
    console.log("API KEY:", config.gemini.apiKey);
    console.log("BASE URL:", config.gemini.baseUrl);
    this.client = axios.create({
      baseURL: config.gemini.baseUrl,
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": config.gemini.apiKey,
      },
    });
  }

  async generateContent(input: GenerateResponseInput): Promise<string> {
    const roleMap: Record<string, string> = {
      USER: "user",
      ASSISTENT: "model",
      SYSTEM: "user",
    };

    const response = await this.client.post(
      `/v1beta/models/${input.model}:generateContent`,
      {
        contents: input.messages.map((message) => ({
          role: roleMap[message.role] || "user",
          parts: [
            {
              text: message.content,
            },
          ],
        })),
        generationConfig: {
          temperature: input.temperature,
          maxOutputTokens: input.maxTokens,
        },
      },
    );

    return response.data.candidates[0].content.parts[0].text;
  }
}
