import { createModel } from "@rematch/core";
import history from "../../history";
import { AuthService } from "../../services/auth-service/auth-service";
import { RootModel } from "../reducer";
import { AuthData, RegistrationData } from "../../types";

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

export const initialState = {
  authorizationStatus: !!user,
  user,
  isFormError: false,
  errorMessages: [] as string[],
};

export const auth = createModel<RootModel>()({
  state: initialState,
  reducers: {
    SET_AUTH_STATUS(state, payload: boolean) {
      state.authorizationStatus = payload;
    },
    FINISH_LOGIN(state, payload) {
      state.user = payload;
    },
    FINISH_REGISTRATION(state) {
      return state;
    },
    LOGOUT(state) {
      state.user = null;
    },
    SET_FORM_ERROR(state, payload: { status: boolean; messages: string[] }) {
      state.isFormError = payload.status;
      state.errorMessages = Array.isArray(payload.messages)
        ? [...payload.messages]
        : [payload.messages];
    },
    RESET_FORM_ERRORS(state) {
      state.isFormError = false;
      state.errorMessages = [];
    },
  },
  effects: (dispatch) => ({
    async login(payload: AuthData) {
      try {
        const response = await AuthService.auth(
          payload.login,
          payload.password,
        );
        dispatch.auth.SET_AUTH_STATUS(true);
        dispatch.auth.FINISH_LOGIN(response);
        history.push(`/`);
      } catch (e: any) {
        dispatch.auth.SET_FORM_ERROR({
          status: true,
          messages: e.data?.message || "Something went wrong, try again",
        });
      }
    },
    async register(payload: RegistrationData) {
      try {
        await AuthService.register(
          payload.name,
          payload.login,
          payload.email,
          payload.password,
        );
        dispatch.auth.FINISH_REGISTRATION();
        history.push(`/login`);
      } catch (e: any) {
        dispatch.auth.SET_FORM_ERROR({
          status: true,
          messages: e.data?.message || "Something went wrong, try again",
        });
      }
    },
    logout() {
      AuthService.logout();
      dispatch.auth.SET_AUTH_STATUS(false);
      dispatch.app.RESET_APP_STATE();
      dispatch.auth.LOGOUT();
    },
  }),
});
