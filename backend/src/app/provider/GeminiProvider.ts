import { GeminiClients } from "../ai/clients/GeminiClients";
import { GenerateResponseInput, GenerateResponseOutput } from "../ai/types";
import { AIProvider } from "./AIProvider";

export class GeminiProvider implements AIProvider {
  private client = new GeminiClients();

  async generateResponse(
    input: GenerateResponseInput,
  ): Promise<GenerateResponseOutput> {
    console.log("GeminiProvider reached");
    const text = await this.client.generateContent(input);

    return {
      text,
    };
  }
}
