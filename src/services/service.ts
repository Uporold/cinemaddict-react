import { AxiosInstance } from "axios";
import { createAPI } from "../api";

export class Service {
  public static api: AxiosInstance;

  static initialize(): void {
    this.api = createAPI();
  }
}

Service.initialize();
