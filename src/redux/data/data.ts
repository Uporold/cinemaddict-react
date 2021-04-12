import { AxiosResponse } from "axios";
import { Comment, CommentBackend, Movie, MovieBackend } from "../../types";
import { commentAdapter, movieAdapter } from "../adapter/adapter";
import { AllReduxActions, BaseThunkActionType } from "../reducer";

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
    default:
      return state;
  }
};
