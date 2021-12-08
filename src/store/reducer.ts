import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import appReducer from "./app/app";
import movieReducer from "./movie/movie";
import commentReducer from "./comment/comment";
import authReducer from "./auth/auth";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    app: appReducer,
    auth: authReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const useStoreDispatch = () => useDispatch<AppDispatch>();
