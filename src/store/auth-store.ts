import { makeAutoObservable, runInAction } from "mobx";
import { AuthData, RegistrationData } from "../types";
import { AuthService } from "../services/auth-service/auth-service";
import history from "../history";
import { RootStore } from "./root-store";

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

export class AuthStore {
  rootStore: RootStore;
  authorizationStatus = !!user;
  user = user;
  isFormError = false;
  errorMessages = [] as string[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  private setErrors(message: string[]) {
    this.isFormError = true;
    this.errorMessages = message;
  }

  resetErrors(): void {
    this.errorMessages = [];
  }

  async login(authData: AuthData): Promise<void> {
    try {
      const response = await AuthService.auth(
        authData.login,
        authData.password,
      );
      runInAction(() => {
        this.user = response;
        this.authorizationStatus = true;
      });
      history.push(`/`);
    } catch (e: any) {
      const message = e.data?.message
        ? [e.data?.message]
        : ["Something went wrong, try again"];
      this.setErrors(message);
    }
  }

  async register(authData: RegistrationData): Promise<void> {
    try {
      await AuthService.register(
        authData.name,
        authData.login,
        authData.email,
        authData.password,
      );
      history.push(`/login`);
    } catch (e: any) {
      const messages = e.data?.message
        ? e.data?.message
        : ["Something went wrong, try again"];
      this.setErrors(messages);
    }
  }

  logout(): void {
    AuthService.logout();
    this.authorizationStatus = false;
    this.rootStore.appStore.resetAppState();
    this.user = null;
  }
}
