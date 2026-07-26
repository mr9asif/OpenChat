import axios, { AxiosInstance } from "axios";
import config from "../../../config";
import { GenerateResponseInput } from "../types";

export class GeminiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.gemini.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async generateContent(input: GenerateResponseInput): Promise<string> {
    const response = await this.client.post(
      `/v1beta/models/${input.model}:generateContent?key=${config.gemini.apiKey}`,
      {
        contents: input.messages.map((message) => ({
          role: message.role,
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
