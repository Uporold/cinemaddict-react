import { AxiosResponse } from "axios";
import { Comment, CommentPure, Movie } from "../../types";
import {
  AllReduxActions,
  BaseThunkActionType,
  InferActionsTypes,
} from "../reducer";
import { ActionCreator as DataActionCreator } from "../movie/movie";

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
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
  SEND_COMMENT: `SEND_COMMENT`,
  UPDATE_MOVIE_COMMENTS: `UPDATE_MOVIE_COMMENTS`,
  DELETE_MOVIE_COMMENT: `DELETE_MOVIE_COMMENT`,
  SET_FORM_ERROR_STATUS: `SET_FORM_ERROR_STATUS`,
  SET_FORM_BLOCK_STATUS: `SET_FORM_BLOCK_STATUS`,
} as const;

export const ActionCreator = {
  loadMovieComments: (comments: Comment[]) => {
    return {
      type: ActionType.LOAD_MOVIE_COMMENTS,
      payload: comments,
    };
  },

  sendComment: (comment: Comment) => {
    return {
      type: ActionType.SEND_COMMENT,
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
  loadMovieComments: (movieId: number): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    const response: AxiosResponse<Comment[]> = await api.get(
      `comments/${movieId}`,
    );
    const loadedComments = response.data;
    dispatch(ActionCreator.loadMovieComments(loadedComments));
  },

  sendComment: (
    movieId: number,
    comment: CommentPure,
  ): ThunkActionTypeAll => async (dispatch, getState, api) => {
    dispatch(ActionCreator.setFormBlockStatus(true));
    try {
      const response: AxiosResponse<Comment> = await api.post(
        `comments/${movieId}`,
        {
          message: comment.message,
          emotion: comment.emotion,
        },
      );
      if (response.status === 200) {
        dispatch(ActionCreator.setFormBlockStatus(false));
      }
      dispatch(ActionCreator.sendComment(response.data));
      dispatch(DataActionCreator.increaseCommentsCount(movieId));
    } catch (err) {
      dispatch(ActionCreator.setFormErrorStatus(true));
      setTimeout(() => {
        dispatch(ActionCreator.setFormErrorStatus(false));
      }, 600);
    } finally {
      dispatch(ActionCreator.setFormBlockStatus(false));
    }
  },

  deleteComment: (commentId: number): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    await api.delete(`/comments/${commentId}`);
    dispatch(ActionCreator.deleteComment(commentId));
  },
};

export const reducer = (
  state = initialState,
  action: CommentActionType,
): InitialStateType => {
  switch (action.type) {
    case ActionType.LOAD_MOVIE_COMMENTS:
      return { ...state, comments: action.payload };
    case ActionType.SEND_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
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