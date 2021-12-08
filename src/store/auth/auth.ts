import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import history from "../../history";
import { AuthService } from "../../services/auth-service/auth-service";
import { AppThunk } from "../reducer";
import { AuthData, RegistrationData } from "../../types";
import { appSlice } from "../app/app";

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

export const initialState = {
  authorizationStatus: !!user,
  user,
  isFormError: false,
  errorMessages: [] as string[],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_AUTH_STATUS(state, action) {
      state.authorizationStatus = action.payload;
    },
    FINISH_LOGIN(state, action) {
      state.user = action.payload;
    },
    FINISH_REGISTRATION(state) {
      return state;
    },
    LOGOUT(state) {
      state.user = null;
    },
    SET_FORM_ERROR(
      state,
      action: PayloadAction<{ status: boolean; messages: string[] }>,
    ) {
      state.isFormError = action.payload.status;
      state.errorMessages = Array.isArray(action.payload.messages)
        ? [...action.payload.messages]
        : [action.payload.messages];
    },
    RESET_FORM_ERRORS(state) {
      state.isFormError = false;
      state.errorMessages = [];
    },
  },
});

export const Operation = {
  login:
    (authData: AuthData): AppThunk =>
    async (dispatch) => {
      try {
        const response = await AuthService.auth(
          authData.login,
          authData.password,
        );
        dispatch(authSlice.actions.SET_AUTH_STATUS(true));
        dispatch(authSlice.actions.FINISH_LOGIN(response));
        history.push(`/`);
      } catch (e: any) {
        dispatch(
          authSlice.actions.SET_FORM_ERROR({
            status: true,
            messages: e.data?.message || "Something went wrong, try again",
          }),
        );
      }
    },

  register:
    (authData: RegistrationData): AppThunk =>
    async (dispatch) => {
      try {
        await AuthService.register(
          authData.name,
          authData.login,
          authData.email,
          authData.password,
        );
        dispatch(authSlice.actions.FINISH_REGISTRATION());
        history.push(`/login`);
      } catch (e: any) {
        dispatch(
          authSlice.actions.SET_FORM_ERROR({
            status: true,
            messages: e.data?.message || "Something went wrong, try again",
          }),
        );
      }
    },

  logout: (): AppThunk => (dispatch) => {
    AuthService.logout();
    dispatch(authSlice.actions.SET_AUTH_STATUS(false));
    dispatch(appSlice.actions.RESET_APP_STATE());
    dispatch(authSlice.actions.LOGOUT());
  },
};

export const { RESET_FORM_ERRORS } = authSlice.actions;

export default authSlice.reducer;
