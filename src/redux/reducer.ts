import { Action, combineReducers } from "redux";
import { AxiosInstance } from "axios";
import { ThunkAction } from "redux-thunk";
import { reducer as data, ActionCreator as DataActions } from "./data/data";
import { reducer as app, ActionCreator as AppActions } from "./app/app";

export const rootReducer = combineReducers({
  DATA: data,
  APP: app,
});

export type GlobalState = ReturnType<typeof rootReducer>;

const combinedActions = { ...DataActions, ...AppActions };

export type AllReduxActions = ReturnType<
  InferActionsTypes<typeof combinedActions>
>;

export type InferActionsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type BaseThunkActionType<A extends Action = Action> = ThunkAction<
  Promise<void>,
  GlobalState,
  AxiosInstance,
  A
>;
