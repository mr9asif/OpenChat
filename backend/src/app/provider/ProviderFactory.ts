import { AIProvider } from "./AIProvider";
import { GroqProvider } from "./GroqProvider";
import { OpenRouterProvider } from "./OpenRouterProvider";

export class ProviderFactory {
  static create(providerName: string): AIProvider {
    switch (providerName.trim().toLowerCase()) {
      case "groq":
        return new GroqProvider();

      case "openrouter":
        return new OpenRouterProvider();

      default:
        throw new Error(`Unsupported AI Provider: ${providerName}`);
    }
  }
}
