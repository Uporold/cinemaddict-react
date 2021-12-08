import { createModel } from "@rematch/core";
import { Movie, UserDetails, UserDetailsToUpdate } from "../../types";
import { RootModel } from "../reducer";
import { API_URL } from "../../api";
import { MoviesService } from "../../services/movies-service/movies-service";

const CUT_LENGTH = 5;

export const initialState = {
  movies: [] as Movie[],
  currentMovie: {} as Movie,
  showedMoviesCount: CUT_LENGTH as number,
  isMoviesLoading: false,
};

export const movies = createModel<RootModel>()({
  state: initialState,
  reducers: {
    SET_MOVIES(state, payload: Movie[]) {
      state.movies = payload;
    },
    SET_CURRENT_MOVIE(state, payload: Movie) {
      state.currentMovie = payload;
    },
    SHOW_MORE_MOVIES(state) {
      state.showedMoviesCount += CUT_LENGTH;
    },
    UPDATE_USER_DETAILS(
      state,
      payload: { movieId: number; userDetails: UserDetails },
    ) {
      state.movies = state.movies.map((item) =>
        item.id === payload.movieId
          ? { ...item, userDetails: payload.userDetails }
          : item,
      );
      state.currentMovie =
        payload.movieId === state.currentMovie.id &&
        window.location.href !== API_URL
          ? { ...state.currentMovie, userDetails: payload.userDetails }
          : state.currentMovie;
    },
    SET_MOVIES_LOADING_STATUS(state, payload: boolean) {
      state.isMoviesLoading = payload;
    },
    RESET_CURRENT_MOVIE(state) {
      state.currentMovie = {} as Movie;
    },
  },
  effects: (dispatch) => ({
    async loadMovies() {
      dispatch.movies.SET_MOVIES_LOADING_STATUS(true);
      const loadedMovies = await MoviesService.loadMovies();
      dispatch.movies.SET_MOVIES(loadedMovies);
      dispatch.movies.SET_MOVIES_LOADING_STATUS(false);
    },
    async loadMovie(movieId: number) {
      const movie = await MoviesService.loadMovie(movieId);
      dispatch.movies.SET_CURRENT_MOVIE(movie);
    },
    async updateUserDetails(payload: {
      movieId: number;
      userDetails: UserDetailsToUpdate;
    }) {
      const { movieId, userDetails } = payload;
      const updatedUserDetails = await MoviesService.updateUserDetails(
        movieId,
        userDetails,
      );
      dispatch.movies.UPDATE_USER_DETAILS({
        movieId,
        userDetails: updatedUserDetails,
      });
    },
  }),
});
