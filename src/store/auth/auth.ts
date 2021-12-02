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
    setAuthorizationStatus(state, action) {
      state.authorizationStatus = action.payload;
    },
    finishLogin(state, action) {
      state.user = action.payload;
    },
    finishRegistration(state) {
      return state;
    },
    logout(state) {
      state.user = null;
    },
    setFormError(
      state,
      action: PayloadAction<{ status: boolean; messages: string[] }>,
    ) {
      state.isFormError = action.payload.status;
      state.errorMessages = Array.isArray(action.payload.messages)
        ? [...action.payload.messages]
        : [action.payload.messages];
    },
    resetErrors(state) {
      state.isFormError = false;
      state.errorMessages = [];
    },
  },
});

export const Operation = {
  login:
    (authData: AuthData): AppThunk =>
    async (dispatch) => {
      dispatch(authSlice.actions.setFormError({ status: false, messages: [] }));
      try {
        const response = await AuthService.auth(
          authData.login,
          authData.password,
        );
        dispatch(authSlice.actions.setAuthorizationStatus(true));
        dispatch(authSlice.actions.finishLogin(response));
        history.push(`/`);
      } catch (e: any) {
        dispatch(
          authSlice.actions.setFormError({
            status: true,
            messages: e.data?.message || "Something went wrong, try again",
          }),
        );
      }
    },

  register:
    (authData: RegistrationData): AppThunk =>
    async (dispatch) => {
      dispatch(authSlice.actions.resetErrors());
      try {
        await AuthService.register(
          authData.name,
          authData.login,
          authData.email,
          authData.password,
        );
        dispatch(authSlice.actions.finishRegistration());
        history.push(`/login`);
      } catch (e: any) {
        dispatch(
          authSlice.actions.setFormError({
            status: true,
            messages: e.data?.message || "Something went wrong, try again",
          }),
        );
      }
    },

  logout: (): AppThunk => (dispatch) => {
    AuthService.logout();
    dispatch(authSlice.actions.setAuthorizationStatus(false));
    dispatch(appSlice.actions.resetAppState());
    dispatch(authSlice.actions.logout());
  },
};

export const { setAuthorizationStatus, logout, resetErrors } =
  authSlice.actions;

export default authSlice.reducer;
