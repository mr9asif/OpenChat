import { GenerateResponseInput, GenerateResponseOutput } from "../ai/types";

export interface AIProvider {
  generateResponse(
    input: GenerateResponseInput,
  ): Promise<GenerateResponseOutput>;

  streamResponse?(input: GenerateResponseInput): Promise<AsyncIterable<any>>;
}
