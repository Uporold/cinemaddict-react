import { AxiosResponse } from "axios";
import { Comment, CommentBackend, Movie, MovieBackend } from "../../types";
import { commentAdapter, movieAdapter } from "../adapter/adapter";
import { AllReduxActions, BaseThunkActionType } from "../reducer";

export const initialState = {
  movies: [] as Movie[],
  movieComments: [] as Comment[],
};

type InitialStateType = typeof initialState;
type ThunkActionType = BaseThunkActionType<AllReduxActions>;

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
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
};

export const Operation = {
  loadMovies: (): ThunkActionType => async (dispatch, getState, api) => {
    const response: AxiosResponse<MovieBackend[]> = await api.get("/movies");
    const loadedMovies = response.data.map((movie) => movieAdapter(movie));
    await dispatch(ActionCreator.loadMovies(loadedMovies));
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
    default:
      return state;
  }
};
