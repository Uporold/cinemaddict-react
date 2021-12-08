import { GlobalState } from "../reducer";

export const getAuthorizationStatus = (state: GlobalState) => {
  return state.auth.authorizationStatus;
};

export const getUser = (state: GlobalState) => {
  return state.auth.user;
};

export const getFormErrorStatus = (state: GlobalState) => {
  return state.auth.isFormError;
};

export const getFormErrorMessage = (state: GlobalState) => {
  return state.auth.errorMessages;
};
