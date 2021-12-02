import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./app/app";
import movieReducer from "./movie/movie";
import commentReducer from "./comment/comment";
import authReducer from "./auth/auth";

export const store = configureStore({
  reducer: {
    MOVIE: movieReducer,
    APP: appReducer,
    AUTH: authReducer,
    COMMENT: commentReducer,
  },
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export type AppThunk = ThunkAction<void, GlobalState, unknown, AnyAction>;
