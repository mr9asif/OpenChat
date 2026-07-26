import axios, { AxiosInstance } from "axios";
import config from "../../../config";

export class GroqClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.groq.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
