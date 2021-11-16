import { GlobalState } from "../reducer";
import { Comment } from "../../types";

export const getMovieComments = (state: GlobalState): Comment[] =>
  state.COMMENT.comments;

export const getFormBlockedStatus = (state: GlobalState) =>
  state.COMMENT.isFormBlocked;

export const getFormErrorStatus = (state: GlobalState) =>
  state.COMMENT.isFormError;
