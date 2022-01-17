import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, UserDetails, UserDetailsToUpdate } from "../../types";
import { AppThunk } from "../reducer";
import { MoviesService } from "../../services/movies-service/movies-service";

const CUT_LENGTH = 5;

export const initialState = {
  movies: [] as Movie[],
  currentMovie: {} as Movie,
  showedMoviesCount: CUT_LENGTH as number,
  isMoviesLoaded: false,
  isMovieLoaded: false,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    SET_MOVIES(state, action) {
      state.movies = action.payload;
    },
    SET_CURRENT_MOVIE(state, action) {
      state.currentMovie = action.payload;
    },
    SHOW_MORE_MOVIES(state) {
      state.showedMoviesCount += CUT_LENGTH;
    },
    UPDATE_USER_DETAILS(
      state,
      action: PayloadAction<{ movieId: number; userDetails: UserDetails }>,
    ) {
      state.movies = state.movies.map((item) =>
        item.id === action.payload.movieId
          ? { ...item, userDetails: action.payload.userDetails }
          : item,
      );
    },
    SET_MOVIES_LOADING_STATUS(state, action) {
      state.isMoviesLoaded = action.payload;
    },
    SET_MOVIE_LOADING_STATUS(state, action) {
      state.isMovieLoaded = action.payload;
    },
    RESET_MOVIES(state) {
      state.movies = [];
      state.isMoviesLoaded = false;
    },
    RESET_CURRENT_MOVIE(state) {
      state.currentMovie = {} as Movie;
      state.isMovieLoaded = false;
    },
  },
});

export const Operation = {
  loadMovies: (): AppThunk => async (dispatch) => {
    const loadedMovies = await MoviesService.loadMovies();
    dispatch(moviesSlice.actions.SET_MOVIES(loadedMovies));
    dispatch(moviesSlice.actions.SET_MOVIES_LOADING_STATUS(true));
  },

  loadMovie:
    (movieId: number): AppThunk =>
    async (dispatch) => {
      const movie = await MoviesService.loadMovie(movieId);
      dispatch(moviesSlice.actions.SET_CURRENT_MOVIE(movie));
      dispatch(moviesSlice.actions.SET_MOVIE_LOADING_STATUS(true));
    },

  updateUserDetails:
    (movieId: number, userDetails: UserDetailsToUpdate): AppThunk =>
    async (dispatch) => {
      const updatedUserDetails = await MoviesService.updateUserDetails(
        movieId,
        userDetails,
      );
      dispatch(
        moviesSlice.actions.UPDATE_USER_DETAILS({
          movieId,
          userDetails: updatedUserDetails,
        }),
      );
    },
};

export const { RESET_CURRENT_MOVIE, RESET_MOVIES, SHOW_MORE_MOVIES } =
  moviesSlice.actions;

export default moviesSlice.reducer;
