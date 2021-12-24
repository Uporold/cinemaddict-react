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
    ADD_COMMENT(state, action) {
      state.comments = [action.payload, ...state.comments];
    },
    SET_FORM_BLOCK_STATUS(state, action) {
      state.isFormBlocked = action.payload;
    },
    SET_FORM_ERROR_STATUS(state, action) {
      state.isFormError = action.payload;
    },
    DELETE_COMMENT(state, action) {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload,
      );
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
    (movieId: number, comment: CommentPure): AppThunk =>
    async (dispatch) => {
      dispatch(commentsSlice.actions.SET_FORM_BLOCK_STATUS(true));
      try {
        const newComment = await CommentsService.sendComment(movieId, comment);
        dispatch(commentsSlice.actions.ADD_COMMENT(newComment));
      } catch (err) {
        dispatch(commentsSlice.actions.SET_FORM_ERROR_STATUS(true));
        setTimeout(() => {
          dispatch(commentsSlice.actions.SET_FORM_ERROR_STATUS(false));
        }, 600);
      } finally {
        dispatch(commentsSlice.actions.SET_FORM_BLOCK_STATUS(false));
      }
    },

  deleteComment:
    (commentId: number): AppThunk =>
    async (dispatch) => {
      await CommentsService.deleteComment(commentId);
      dispatch(commentsSlice.actions.DELETE_COMMENT(commentId));
    },
};

export default commentsSlice.reducer;
