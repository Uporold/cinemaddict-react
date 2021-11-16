import { GlobalState } from "../reducer";

export const getAuthorizationStatus = (state: GlobalState) => {
  return state.AUTH.authorizationStatus;
};

export const getUser = (state: GlobalState) => {
  return state.AUTH.user;
};

export const getFormErrorStatus = (state: GlobalState) => {
  return state.AUTH.isFormError;
};

export const getFormErrorMessage = (state: GlobalState) => {
  return state.AUTH.errorMessages;
};
