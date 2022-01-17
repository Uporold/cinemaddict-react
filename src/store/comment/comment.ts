import { createSlice } from "@reduxjs/toolkit";
import { Comment, CommentPure } from "../../types";
import { AppThunk } from "../reducer";
import { CommentsService } from "../../services/comments-service/comments-service";

export const initialState = {
  comments: [] as Comment[],
  isFormBlocked: false,
  isFormError: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    SET_COMMENTS(state, action) {
      state.comments = action.payload;
    },
    SET_FORM_BLOCK_STATUS(state, action) {
      state.isFormBlocked = action.payload;
    },
    SET_FORM_ERROR_STATUS(state, action) {
      state.isFormError = action.payload;
    },
    RESET_COMMENTS(state) {
      state.comments = [];
    },
  },
});

export const Operation = {
  loadMovieComments:
    (movieId: number): AppThunk =>
    async (dispatch) => {
      const loadedComments = await CommentsService.loadMovieComments(movieId);
      dispatch(commentsSlice.actions.SET_COMMENTS(loadedComments));
    },

  sendComment:
    (movieId: number, comment: CommentPure): AppThunk<Promise<boolean>> =>
    async (dispatch) => {
      dispatch(commentsSlice.actions.SET_FORM_BLOCK_STATUS(true));
      try {
        await CommentsService.sendComment(movieId, comment);
        await dispatch(Operation.loadMovieComments(movieId));
        return true;
      } catch (err) {
        dispatch(commentsSlice.actions.SET_FORM_ERROR_STATUS(true));
        setTimeout(() => {
          dispatch(commentsSlice.actions.SET_FORM_ERROR_STATUS(false));
        }, 600);
      } finally {
        dispatch(commentsSlice.actions.SET_FORM_BLOCK_STATUS(false));
      }
      return false;
    },

  deleteComment:
    (commentId: number, movieId: number): AppThunk =>
    async (dispatch) => {
      await CommentsService.deleteComment(commentId);
      await dispatch(Operation.loadMovieComments(movieId));
    },
};

export const { RESET_COMMENTS } = commentsSlice.actions;

export default commentsSlice.reducer;
