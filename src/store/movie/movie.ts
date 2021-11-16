import { AxiosResponse } from "axios";
import { Comment, Movie, UserDetails, UserDetailsToUpdate } from "../../types";
import { AllReduxActions, BaseThunkActionType } from "../reducer";
import { API_URL } from "../../api";
import { movieAdapter } from "../adapter/adapter";

const CUT_LENGTH = 5;

export const initialState = {
  movies: [] as Movie[],
  currentMovie: {} as Movie,
  showedMoviesCount: CUT_LENGTH as number,
  isMoviesLoading: false,
};

type InitialStateType = typeof initialState;
type ThunkActionType = BaseThunkActionType<AllReduxActions>;

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE: `LOAD_MOVIE`,
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
  ADD_MOVIE_COMMENT: `ADD_MOVIE_COMMENT`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  SET_DEFAULT_MOVIES_COUNT: `SET_DEFAULT_MOVIES_COUNT`,
  UPDATE_USER_DETAILS: `UPDATE_USER_DETAILS`,
  SET_MOVIES_LOADING_STATUS: `SET_MOVIES_LOADING_STATUS`,
  RESET_CURRENT_MOVIE: `RESET_CURRENT_MOVIE`,
} as const;

export const ActionCreator = {
  loadMovies: (movies: Movie[]) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },

  loadMovie: (movie: Movie) => {
    return {
      type: ActionType.LOAD_MOVIE,
      payload: movie,
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

  updateUserDetails: (movieId: number, userDetails: UserDetails) => {
    return {
      type: ActionType.UPDATE_USER_DETAILS,
      payload: userDetails,
      movieId,
    };
  },

  increaseCommentsCount: (movieId: number) => {
    return {
      type: ActionType.ADD_MOVIE_COMMENT,
      payload: movieId,
    };
  },

  setMoviesLoadingStatus: (status: boolean) => {
    return {
      type: ActionType.SET_MOVIES_LOADING_STATUS,
      payload: status,
    };
  },
  resetCurrentMovie: () => {
    return {
      type: ActionType.RESET_CURRENT_MOVIE,
    };
  },
};

export const Operation = {
  loadMovies: (): ThunkActionType => async (dispatch, getState, api) => {
    dispatch(ActionCreator.setMoviesLoadingStatus(true));
    const response: AxiosResponse<Movie[]> = await api.get("/movies");
    const loadedMovies = response.data.map((movie) => movieAdapter(movie));
    dispatch(ActionCreator.loadMovies(loadedMovies));
    dispatch(ActionCreator.setMoviesLoadingStatus(false));
  },

  loadMovie: (movieId: number): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    const response: AxiosResponse<Movie> = await api.get(`/movies/${movieId}`);
    dispatch(ActionCreator.loadMovie(movieAdapter(response.data)));
  },

  updateUserDetails: (
    movieId: number,
    userDetails: UserDetailsToUpdate,
  ): ThunkActionType => async (dispatch, getState, api) => {
    const response: AxiosResponse<UserDetails> = await api.patch(
      `/movies/${movieId}/status`,
      userDetails,
    );
    dispatch(ActionCreator.updateUserDetails(movieId, response.data));
  },
};

export const reducer = (
  state = initialState,
  action: AllReduxActions,
): InitialStateType => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return { ...state, movies: action.payload };
    case ActionType.LOAD_MOVIE:
      return { ...state, currentMovie: action.payload };
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
          item.id === action.movieId
            ? { ...item, userDetails: action.payload }
            : item,
        ),
        currentMovie:
          action.movieId === state.currentMovie.id &&
          window.location.href !== API_URL
            ? { ...state.currentMovie, userDetails: action.payload }
            : state.currentMovie,
      };
    case ActionType.SET_MOVIES_LOADING_STATUS:
      return {
        ...state,
        isMoviesLoading: action.payload,
      };
    case ActionType.RESET_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: {} as Movie,
      };
    default:
      return state;
  }
};
