import axios, { AxiosInstance } from "axios";
import config from "../../../config";

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
}
