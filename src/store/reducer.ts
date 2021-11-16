import { Action, combineReducers } from "redux";
import { AxiosInstance } from "axios";
import { ThunkAction } from "redux-thunk";
import { reducer as movie, ActionCreator as DataActions } from "./movie/movie";
import { reducer as app, ActionCreator as AppActions } from "./app/app";
import {
  reducer as comment,
  ActionCreator as CommentActions,
} from "./comment/comment";
import { reducer as auth, ActionCreator as AuthActions } from "./auth/auth";

export const rootReducer = combineReducers({
  MOVIE: movie,
  APP: app,
  AUTH: auth,
  COMMENT: comment,
});

export type GlobalState = ReturnType<typeof rootReducer>;

const combinedActions = {
  ...DataActions,
  ...AppActions,
  ...CommentActions,
  ...AuthActions,
};

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
