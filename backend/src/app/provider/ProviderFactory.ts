import { AIProvider } from "./AIProvider";
import { GeminiProvider } from "./GeminiProvider";

export class ProviderFactory {
  static create(providerName: string): AIProvider {
    switch (providerName.toLowerCase()) {
      case "gemini":
        return new GeminiProvider();

      // case "groq":
      //   return new GroqProvider();

      // case "openrouter":
      //   return new OpenRouterProvider();

      default:
        throw new Error(`Unsupported AI Provider: ${providerName}`);
    }
  }
}
