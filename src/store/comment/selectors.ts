import { GlobalState } from "../reducer";
import { Comment } from "../../types";

export const getMovieComments = (state: GlobalState): Comment[] =>
  state.comments.comments;

export const getFormBlockedStatus = (state: GlobalState) =>
  state.comments.isFormBlocked;

export const getFormErrorStatus = (state: GlobalState) =>
  state.comments.isFormError;
