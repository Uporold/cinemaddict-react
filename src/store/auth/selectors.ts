import { RootState } from "../reducer";

export const getAuthorizationStatus = (state: RootState) => {
  return state.auth.authorizationStatus;
};

export const getUser = (state: RootState) => {
  return state.auth.user;
};

export const getFormErrorStatus = (state: RootState) => {
  return state.auth.isFormError;
};

export const getFormErrorMessage = (state: RootState) => {
  return state.auth.errorMessages;
};
