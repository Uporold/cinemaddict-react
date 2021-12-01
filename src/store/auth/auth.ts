import { Dispatch } from "redux";
import history from "../../history";
import { AuthService } from "../../services/auth-service/auth-service";
import {
  AllReduxActions,
  BaseThunkActionType,
  InferActionsTypes,
} from "../reducer";
import { AuthData, RegistrationData } from "../../types";
import { ActionCreator as AppActionCreator } from "../app/app";

type UserActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;
type ThunkActionType = BaseThunkActionType<UserActionTypes>;

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

export const initialState = {
  authorizationStatus: !!user,
  user,
  isFormError: false,
  errorMessages: [] as string[],
};

type InitialStateType = typeof initialState;

export const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  FINISH_LOGIN: `FINISH_LOGIN`,
  FINISH_REGISTRATION: `FINISH_REGISTRATION`,
  LOGOUT: `LOGOUT`,
  SET_FORM_ERROR: `SET_FORM_ERROR`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
  RESET_ERRORS: `RESET_ERRORS`,
} as const;

export const ActionCreator = {
  setAuthorizationStatus: (status: boolean) => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status,
    };
  },

  finishLogin: (data: AuthData) => {
    return {
      type: ActionType.FINISH_LOGIN,
      payload: data,
    };
  },

  setFormError: (status: boolean, messages: string[]) => {
    return {
      type: ActionType.SET_FORM_ERROR,
      status,
      messages,
    };
  },

  finishRegistration: () => {
    return {
      type: ActionType.FINISH_REGISTRATION,
    };
  },

  logout: () => {
    return {
      type: ActionType.LOGOUT,
    };
  },

  resetErrors: () => {
    return {
      type: ActionType.RESET_ERRORS,
    };
  },
};

export const Operation = {
  login: (authData: AuthData): ThunkActionType => async (
    dispatch,
  ): Promise<void> => {
    dispatch(ActionCreator.setFormError(false, []));
    try {
      const response = await AuthService.auth(
        authData.login,
        authData.password,
      );
      dispatch(ActionCreator.setAuthorizationStatus(true));
      dispatch(ActionCreator.finishLogin(response));
      history.push(`/`);
    } catch (e) {
      dispatch(
        ActionCreator.setFormError(
          true,
          e.data?.message || "Something went wrong, try again",
        ),
      );
    }
  },

  register: (authData: RegistrationData): ThunkActionType => async (
    dispatch,
  ): Promise<void> => {
    dispatch(ActionCreator.resetErrors());
    try {
      await AuthService.register(
        authData.name,
        authData.login,
        authData.email,
        authData.password,
      );
      dispatch(ActionCreator.finishRegistration());
      history.push(`/login`);
    } catch (e) {
      dispatch(
        ActionCreator.setFormError(
          true,
          e.data?.message || "Something went wrong, try again",
        ),
      );
    }
  },

  logout: () => (dispatch: Dispatch<AllReduxActions>) => {
    AuthService.logout();
    dispatch(ActionCreator.setAuthorizationStatus(false));
    dispatch(AppActionCreator.resetAppState());
    dispatch(ActionCreator.logout());
  },
};

export const reducer = (
  state = initialState,
  action: AllReduxActions,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.FINISH_LOGIN:
      return { ...state, user: action.payload };
    case ActionType.FINISH_REGISTRATION:
      return { ...state };
    case ActionType.LOGOUT:
      return { ...state, user: null };
    case ActionType.SET_FORM_ERROR:
      return {
        ...state,
        isFormError: action.status,
        errorMessages: Array.isArray(action.messages)
          ? [...action.messages]
          : [action.messages],
      };
    case ActionType.RESET_ERRORS:
      return {
        ...state,
        isFormError: false,
        errorMessages: [],
      };
    default:
      return state;
  }
};
