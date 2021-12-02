import { createSlice } from "@reduxjs/toolkit";
import { Comment, CommentPure } from "../../types";
import { AppThunk } from "../reducer";
import { CommentsService } from "../../services/comments-service/comments-service";

export const initialState = {
  comments: [] as Comment[],
  isFormBlocked: false,
  isFormError: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    loadMovieComments(state, action) {
      state.comments = action.payload;
    },
    sendComment(state, action) {
      state.comments = [...state.comments, action.payload];
    },
    setFormBlockStatus(state, action) {
      state.isFormBlocked = action.payload;
    },
    setFormErrorStatus(state, action) {
      state.isFormError = action.payload;
    },
    deleteComment(state, action) {
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
      dispatch(commentSlice.actions.loadMovieComments(loadedComments));
    },

  sendComment:
    (movieId: number, comment: CommentPure): AppThunk =>
    async (dispatch) => {
      dispatch(commentSlice.actions.setFormBlockStatus(true));
      try {
        const newComment = await CommentsService.sendComment(movieId, comment);
        dispatch(commentSlice.actions.sendComment(newComment));
      } catch (err) {
        dispatch(commentSlice.actions.setFormErrorStatus(true));
        setTimeout(() => {
          dispatch(commentSlice.actions.setFormErrorStatus(false));
        }, 600);
      } finally {
        dispatch(commentSlice.actions.setFormBlockStatus(false));
      }
    },

  deleteComment:
    (commentId: number): AppThunk =>
    async (dispatch) => {
      await CommentsService.deleteComment(commentId);
      dispatch(commentSlice.actions.deleteComment(commentId));
    },
};

export default commentSlice.reducer;
