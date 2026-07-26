import { GenerateResponseInput, GenerateResponseOutput } from "../ai/types";
import { AIProvider } from "./AIProvider";

export class GeminiProvider implements AIProvider {
  async generateResponse(
    input: GenerateResponseInput,
  ): Promise<GenerateResponseOutput> {
    throw new Error("Method not implemented.");
  }
}
