import axios, { AxiosInstance } from "axios";
import config from "../../../config";

export class OpenRouterClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.openRouter.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
