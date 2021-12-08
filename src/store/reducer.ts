import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import { useDispatch } from "react-redux";
import immerPlugin from "@rematch/immer";
import { app } from "./app/app";
import { movies } from "./movie/movie";
import { comments } from "./comment/comment";
import { auth } from "./auth/auth";

export interface RootModel extends Models<RootModel> {
  movies: typeof movies;
  app: typeof app;
  auth: typeof auth;
  comments: typeof comments;
}

const models: RootModel = { movies, app, auth, comments };

export const store = init<RootModel>({
  models,
  plugins: [immerPlugin()],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const useStoreDispatch = () => useDispatch<Dispatch>();
