import { AxiosInstance } from "axios";
import { createAPI } from "../../api";

export class AuthService {
  private static api: AxiosInstance;

  static initialize() {
    this.api = createAPI();
  }

  static async auth(login: string, password: string) {
    const response = await this.api.post(`auth/login`, {
      login,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  static logout() {
    localStorage.removeItem("user");
  }

  static register(
    name: string,
    login: string,
    email: string,
    password: string,
  ) {
    return this.api.post(`auth/register`, {
      name,
      login,
      email,
      password,
    });
  }
}

AuthService.initialize();
