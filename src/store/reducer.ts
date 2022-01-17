import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { useDispatch } from "react-redux";
import { reducer as movies, ActionCreator as DataActions } from "./movie/movie";
import { reducer as app, ActionCreator as AppActions } from "./app/app";
import {
  reducer as comments,
  ActionCreator as CommentActions,
} from "./comment/comment";
import { reducer as auth, ActionCreator as AuthActions } from "./auth/auth";

export const rootReducer = combineReducers({
  movies,
  app,
  auth,
  comments,
});

export type RootState = ReturnType<typeof rootReducer>;

const combinedActions = {
  ...DataActions,
  ...AppActions,
  ...CommentActions,
  ...AuthActions,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<RootState, AllReduxActions>),
  ),
);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export type AllReduxActions = ReturnType<
  InferActionsTypes<typeof combinedActions>
>;

export type InferActionsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type BaseThunkActionType<
  A extends Action = Action,
  R = void,
> = ThunkAction<R, RootState, unknown, A>;

export const useStoreDispatch = () => useDispatch<AppDispatch>();
