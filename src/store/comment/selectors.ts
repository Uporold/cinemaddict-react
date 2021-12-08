import { RootState } from "../reducer";
import { Comment } from "../../types";

export const getMovieComments = (state: RootState): Comment[] =>
  state.comments.comments;

export const getFormBlockedStatus = (state: RootState) =>
  state.comments.isFormBlocked;

export const getFormErrorStatus = (state: RootState) =>
  state.comments.isFormError;
