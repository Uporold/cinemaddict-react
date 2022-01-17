import { createModel } from "@rematch/core";
import { Comment, CommentPure } from "../../types";
import { CommentsService } from "../../services/comments-service/comments-service";
import { RootModel } from "../reducer";

export const initialState = {
  comments: [] as Comment[],
  isFormBlocked: false,
  isFormError: false,
};

export const comments = createModel<RootModel>()({
  state: initialState,
  reducers: {
    SET_COMMENTS(state, payload: Comment[]) {
      state.comments = payload;
    },
    SET_FORM_BLOCK_STATUS(state, payload: boolean) {
      state.isFormBlocked = payload;
    },
    SET_FORM_ERROR_STATUS(state, payload: boolean) {
      state.isFormError = payload;
    },
    RESET_COMMENTS(state) {
      state.comments = [];
    },
  },
  effects: (dispatch) => ({
    async loadMovieComments(movieId: number) {
      const loadedComments = await CommentsService.loadMovieComments(movieId);
      dispatch.comments.SET_COMMENTS(loadedComments);
    },
    async sendComment(payload: { movieId: number; comment: CommentPure }) {
      dispatch.comments.SET_FORM_BLOCK_STATUS(true);
      try {
        const { movieId, comment } = payload;
        await CommentsService.sendComment(movieId, comment);
        dispatch.comments.loadMovieComments(movieId);
        return true;
      } catch (err) {
        dispatch.comments.SET_FORM_ERROR_STATUS(true);
        setTimeout(() => {
          dispatch.comments.SET_FORM_ERROR_STATUS(false);
        }, 600);
      } finally {
        dispatch.comments.SET_FORM_BLOCK_STATUS(false);
      }
      return false;
    },
    async deleteComment(payload: { commentId: number; movieId: number }) {
      const { commentId, movieId } = payload;
      await CommentsService.deleteComment(commentId);
      dispatch.comments.loadMovieComments(movieId);
    },
  }),
});
