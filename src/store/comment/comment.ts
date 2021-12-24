import { Comment, CommentPure, Movie } from "../../types";
import {
  AllReduxActions,
  BaseThunkActionType,
  InferActionsTypes,
} from "../reducer";
import { CommentsService } from "../../services/comments-service/comments-service";

export const initialState = {
  comments: [] as Comment[],
  isFormBlocked: false,
  isFormError: false,
};

type InitialStateType = typeof initialState;
type CommentActionType = ReturnType<InferActionsTypes<typeof ActionCreator>>;
type ThunkActionType = BaseThunkActionType<CommentActionType>;
type ThunkActionTypeAll = BaseThunkActionType<AllReduxActions>;

const ActionType = {
  SET_MOVIE_COMMENTS: `SET_MOVIE_COMMENTS`,
  ADD_COMMENT: `ADD_COMMENT`,
  UPDATE_MOVIE_COMMENTS: `UPDATE_MOVIE_COMMENTS`,
  DELETE_MOVIE_COMMENT: `DELETE_MOVIE_COMMENT`,
  SET_FORM_ERROR_STATUS: `SET_FORM_ERROR_STATUS`,
  SET_FORM_BLOCK_STATUS: `SET_FORM_BLOCK_STATUS`,
} as const;

export const ActionCreator = {
  setMovieComments: (comments: Comment[]) => {
    return {
      type: ActionType.SET_MOVIE_COMMENTS,
      payload: comments,
    };
  },

  addComment: (comment: Comment) => {
    return {
      type: ActionType.ADD_COMMENT,
      payload: comment,
    };
  },

  deleteComment: (commentId: number) => {
    return {
      type: ActionType.DELETE_MOVIE_COMMENT,
      payload: commentId,
    };
  },

  updateMovieComments: (movie: Movie) => {
    return {
      type: ActionType.UPDATE_MOVIE_COMMENTS,
      payload: movie,
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
};

export const Operation = {
  loadMovieComments:
    (movieId: number): ThunkActionType =>
    async (dispatch) => {
      const loadedComments = await CommentsService.loadMovieComments(movieId);
      dispatch(ActionCreator.setMovieComments(loadedComments));
    },

  sendComment:
    (movieId: number, comment: CommentPure): ThunkActionTypeAll =>
    async (dispatch) => {
      dispatch(ActionCreator.setFormBlockStatus(true));
      try {
        const newComment = await CommentsService.sendComment(movieId, comment);
        dispatch(ActionCreator.addComment(newComment));
      } catch (err) {
        dispatch(ActionCreator.setFormErrorStatus(true));
        setTimeout(() => {
          dispatch(ActionCreator.setFormErrorStatus(false));
        }, 600);
      } finally {
        dispatch(ActionCreator.setFormBlockStatus(false));
      }
    },

  deleteComment:
    (commentId: number): ThunkActionType =>
    async (dispatch) => {
      await CommentsService.deleteComment(commentId);
      dispatch(ActionCreator.deleteComment(commentId));
    },
};

export const reducer = (
  state = initialState,
  action: CommentActionType,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_MOVIE_COMMENTS:
      return { ...state, comments: action.payload };
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case ActionType.SET_FORM_BLOCK_STATUS:
      return { ...state, isFormBlocked: action.payload };
    case ActionType.SET_FORM_ERROR_STATUS:
      return { ...state, isFormError: action.payload };
    case ActionType.DELETE_MOVIE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};
