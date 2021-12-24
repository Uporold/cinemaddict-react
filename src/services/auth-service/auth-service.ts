import { Service } from "../service";

export class AuthService extends Service {
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
