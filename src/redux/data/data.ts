import { AxiosResponse } from "axios";
import {
  Comment,
  CommentBackend,
  CommentPure,
  Movie,
  MovieBackend,
} from "../../types";
import { commentAdapter, movieAdapter } from "../adapter/adapter";
import { AllReduxActions, BaseThunkActionType } from "../reducer";
import { ActionCreator as AppActionCreator } from "../app/app";

const CUT_LENGTH = 5;

export const initialState = {
  movies: [] as Movie[],
  movieComments: [] as Comment[],
  showedMoviesCount: CUT_LENGTH as number,
};

type InitialStateType = typeof initialState;
type ThunkActionType = BaseThunkActionType<AllReduxActions>;

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
  SEND_COMMENT: `SEND_COMMENT`,
  UPDATE_MOVIE_COMMENTS: `UPDATE_MOVIE_COMMENTS`,
  DELETE_MOVIE_COMMENT: `DELETE_MOVIE_COMMENT`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  SET_DEFAULT_MOVIES_COUNT: `SET_DEFAULT_MOVIES_COUNT`,
  UPDATE_USER_DETAILS: `UPDATE_USER_DETAILS`,
} as const;

export const ActionCreator = {
  loadMovies: (movies: Movie[]) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },

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

  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: CUT_LENGTH,
  }),

  setDefaultMoviesCount: () => ({
    type: ActionType.SET_DEFAULT_MOVIES_COUNT,
    payload: CUT_LENGTH,
  }),

  updateUserDetails: (movie: Movie) => {
    return {
      type: ActionType.UPDATE_USER_DETAILS,
      payload: movie,
    };
  },

  updateMovieComments: (movie: Movie) => {
    return {
      type: ActionType.UPDATE_MOVIE_COMMENTS,
      payload: movie,
    };
  },
};

export const Operation = {
  loadMovies: (): ThunkActionType => async (dispatch, getState, api) => {
    const response: AxiosResponse<MovieBackend[]> = await api.get("/movies");
    const loadedMovies = response.data.map((movie) => movieAdapter(movie));
    dispatch(ActionCreator.loadMovies(loadedMovies));
  },

  loadMovieComments: (movieId: number): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    const response: AxiosResponse<CommentBackend[]> = await api.get(
      `/comments/${movieId}`,
    );
    const loadedComments = response.data.map((comment) =>
      commentAdapter(comment),
    );
    dispatch(ActionCreator.loadMovieComments(loadedComments));
  },

  updateUserDetails: (movie: MovieBackend): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    const response: AxiosResponse<MovieBackend> = await api.put(
      `/movies/${movie.id}`,
      movie,
    );
    dispatch(ActionCreator.updateUserDetails(movieAdapter(response.data)));
  },

  sendComment: (
    movieId: number,
    comment: CommentPure,
  ): ThunkActionType => async (dispatch, getState, api) => {
    dispatch(AppActionCreator.setFormBlockStatus(true));
    try {
      const response: AxiosResponse = await api.post(`/comments/${movieId}`, {
        comment: comment.comment,
        date: comment.date,
        emotion: comment.emotion,
      });
      dispatch(
        ActionCreator.sendComment(
          commentAdapter(
            response.data.comments[response.data.comments.length - 1],
          ),
        ),
      );
      dispatch(
        ActionCreator.updateMovieComments(movieAdapter(response.data.movie)),
      );
    } catch (err) {
      dispatch(AppActionCreator.setFormBlockStatus(false));
      dispatch(AppActionCreator.setFormErrorStatus(true));
      setTimeout(
        () => dispatch(AppActionCreator.setFormErrorStatus(false)),
        600,
      );
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
  action: AllReduxActions,
): InitialStateType => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return { ...state, movies: action.payload };
    case ActionType.LOAD_MOVIE_COMMENTS:
      return { ...state, movieComments: action.payload };
    case ActionType.SHOW_MORE_MOVIES:
      return {
        ...state,
        showedMoviesCount: state.showedMoviesCount + action.payload,
      };
    case ActionType.SET_DEFAULT_MOVIES_COUNT:
      return { ...state, showedMoviesCount: action.payload };
    case ActionType.UPDATE_USER_DETAILS:
      return {
        ...state,
        movies: state.movies.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    case ActionType.SEND_COMMENT:
      return {
        ...state,
        movieComments: [...state.movieComments, action.payload],
      };
    case ActionType.UPDATE_MOVIE_COMMENTS:
      return {
        ...state,
        movies: state.movies.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    case ActionType.DELETE_MOVIE_COMMENT:
      return {
        ...state,
        movieComments: state.movieComments.filter(
          (comment) => comment.id !== action.payload,
        ),
        movies: state.movies.map((item) => {
          if (!item.commentsIds.includes(action.payload)) return item;
          const index = item.commentsIds.indexOf(action.payload);
          item.commentsIds.splice(index, 1);
          return item;
        }),
      };
    default:
      return state;
  }
};
