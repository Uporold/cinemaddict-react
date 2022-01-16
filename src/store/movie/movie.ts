import { Movie, UserDetails, UserDetailsToUpdate } from "../../types";
import { AllReduxActions, BaseThunkActionType } from "../reducer";
import { MoviesService } from "../../services/movies-service/movies-service";

const CUT_LENGTH = 5;

export const initialState = {
  movies: [] as Movie[],
  currentMovie: {} as Movie,
  showedMoviesCount: CUT_LENGTH as number,
  isMoviesLoaded: false,
  isMovieLoaded: false,
};

type InitialStateType = typeof initialState;
type ThunkActionType = BaseThunkActionType<AllReduxActions>;

const ActionType = {
  SET_MOVIES: `SET_MOVIES`,
  SET_MOVIE: `SET_MOVIE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  SET_DEFAULT_MOVIES_COUNT: `SET_DEFAULT_MOVIES_COUNT`,
  UPDATE_USER_DETAILS: `UPDATE_USER_DETAILS`,
  SET_MOVIES_LOADING_STATUS: `SET_MOVIES_LOADING_STATUS`,
  SET_MOVIE_LOADING_STATUS: `SET_MOVIE_LOADING_STATUS`,
  RESET_CURRENT_MOVIE: `RESET_CURRENT_MOVIE`,
  RESET_MOVIES: `RESET_MOVIES`,
} as const;

export const ActionCreator = {
  loadMovies: (movies: Movie[]) => {
    return {
      type: ActionType.SET_MOVIES,
      payload: movies,
    };
  },

  loadMovie: (movie: Movie) => {
    return {
      type: ActionType.SET_MOVIE,
      payload: movie,
    };
  },

  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
  }),

  setDefaultMoviesCount: () => ({
    type: ActionType.SET_DEFAULT_MOVIES_COUNT,
  }),

  updateUserDetails: (movieId: number, userDetails: UserDetails) => {
    return {
      type: ActionType.UPDATE_USER_DETAILS,
      payload: userDetails,
      movieId,
    };
  },

  setMoviesLoadingStatus: (status: boolean) => {
    return {
      type: ActionType.SET_MOVIES_LOADING_STATUS,
      payload: status,
    };
  },

  setMovieLoadingStatus: (status: boolean) => {
    return {
      type: ActionType.SET_MOVIE_LOADING_STATUS,
      payload: status,
    };
  },

  resetCurrentMovie: () => {
    return {
      type: ActionType.RESET_CURRENT_MOVIE,
    };
  },

  resetMovies: () => {
    return {
      type: ActionType.RESET_MOVIES,
    };
  },
};

export const Operation = {
  loadMovies: (): ThunkActionType => async (dispatch) => {
    dispatch(ActionCreator.setMoviesLoadingStatus(true));
    const loadedMovies = await MoviesService.loadMovies();
    dispatch(ActionCreator.loadMovies(loadedMovies));
  },

  loadMovie:
    (movieId: number): ThunkActionType =>
    async (dispatch) => {
      dispatch(ActionCreator.setMovieLoadingStatus(true));
      const movie = await MoviesService.loadMovie(movieId);
      dispatch(ActionCreator.loadMovie(movie));
    },

  updateUserDetails:
    (movieId: number, userDetails: UserDetailsToUpdate): ThunkActionType =>
    async (dispatch) => {
      const updatedUserDetails = await MoviesService.updateUserDetails(
        movieId,
        userDetails,
      );
      dispatch(ActionCreator.updateUserDetails(movieId, updatedUserDetails));
    },
};

export const reducer = (
  state = initialState,
  action: AllReduxActions,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_MOVIES:
      return { ...state, movies: action.payload };
    case ActionType.SET_MOVIE:
      return { ...state, currentMovie: action.payload };
    case ActionType.SHOW_MORE_MOVIES:
      return {
        ...state,
        showedMoviesCount: state.showedMoviesCount + CUT_LENGTH,
      };
    case ActionType.SET_DEFAULT_MOVIES_COUNT:
      return { ...state, showedMoviesCount: CUT_LENGTH };
    case ActionType.UPDATE_USER_DETAILS:
      return {
        ...state,
        movies: state.movies.map((item) =>
          item.id === action.movieId
            ? { ...item, userDetails: action.payload }
            : item,
        ),
      };
    case ActionType.SET_MOVIES_LOADING_STATUS:
      return {
        ...state,
        isMoviesLoaded: action.payload,
      };
    case ActionType.SET_MOVIE_LOADING_STATUS:
      return {
        ...state,
        isMovieLoaded: action.payload,
      };
    case ActionType.RESET_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: {} as Movie,
        isMovieLoaded: false,
      };
    case ActionType.RESET_MOVIES:
      return {
        ...state,
        movies: [],
        isMoviesLoaded: false,
      };
    default:
      return state;
  }
};
