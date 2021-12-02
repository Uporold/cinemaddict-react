import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { AxiosInstance } from "axios";
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
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

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<GlobalState, AllReduxActions>),
  ),
);

export type AppStore = typeof store;

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
