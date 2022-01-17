import { Comment, CommentPure } from "../../types";
import { BaseThunkActionType, InferActionsTypes } from "../reducer";
import { CommentsService } from "../../services/comments-service/comments-service";

export const initialState = {
  comments: [] as Comment[],
  isFormBlocked: false,
  isFormError: false,
};

type InitialStateType = typeof initialState;
type CommentActionType = ReturnType<InferActionsTypes<typeof ActionCreator>>;
type ThunkActionType<R = void> = BaseThunkActionType<CommentActionType, R>;

const ActionType = {
  SET_MOVIE_COMMENTS: `SET_MOVIE_COMMENTS`,
  SET_FORM_ERROR_STATUS: `SET_FORM_ERROR_STATUS`,
  SET_FORM_BLOCK_STATUS: `SET_FORM_BLOCK_STATUS`,
  RESET_COMMENTS: `RESET_COMMENTS`,
} as const;

export const ActionCreator = {
  setMovieComments: (comments: Comment[]) => {
    return {
      type: ActionType.SET_MOVIE_COMMENTS,
      payload: comments,
    };
  },

  setFormErrorStatus: (status: boolean) => {
    return {
      type: ActionType.SET_FORM_ERROR_STATUS,
      payload: status,
    };
  },

  setFormBlockStatus: (status: boolean) => {
    return {
      type: ActionType.SET_FORM_BLOCK_STATUS,
      payload: status,
    };
  },

  resetComments: () => {
    return {
      type: ActionType.RESET_COMMENTS,
    };
  },
};

export const Operation = {
  loadMovieComments:
    (movieId: number): ThunkActionType =>
    async (dispatch) => {
      const loadedComments = await CommentsService.loadMovieComments(movieId);
      dispatch(ActionCreator.setMovieComments(loadedComments));
    },

  sendComment:
    (
      movieId: number,
      comment: CommentPure,
    ): ThunkActionType<Promise<boolean>> =>
    async (dispatch) => {
      dispatch(ActionCreator.setFormBlockStatus(true));
      try {
        await CommentsService.sendComment(movieId, comment);
        dispatch(Operation.loadMovieComments(movieId));
        return true;
      } catch (err) {
        dispatch(ActionCreator.setFormErrorStatus(true));
        setTimeout(() => {
          dispatch(ActionCreator.setFormErrorStatus(false));
        }, 600);
      } finally {
        dispatch(ActionCreator.setFormBlockStatus(false));
      }
      return false;
    },

  deleteComment:
    (commentId: number, movieId: number): ThunkActionType =>
    async (dispatch) => {
      await CommentsService.deleteComment(commentId);
      dispatch(Operation.loadMovieComments(movieId));
    },
};

export const reducer = (
  state = initialState,
  action: CommentActionType,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_MOVIE_COMMENTS:
      return { ...state, comments: action.payload };
    case ActionType.SET_FORM_BLOCK_STATUS:
      return { ...state, isFormBlocked: action.payload };
    case ActionType.SET_FORM_ERROR_STATUS:
      return { ...state, isFormError: action.payload };
    case ActionType.RESET_COMMENTS:
      return { ...state, comments: [] };
    default:
      return state;
  }
};
