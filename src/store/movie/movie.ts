import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, UserDetails, UserDetailsToUpdate } from "../../types";
import { AppThunk } from "../reducer";
import { API_URL } from "../../api";
import { MoviesService } from "../../services/movies-service/movies-service";

const CUT_LENGTH = 5;

export const initialState = {
  movies: [] as Movie[],
  currentMovie: {} as Movie,
  showedMoviesCount: CUT_LENGTH as number,
  isMoviesLoading: false,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadMovies(state, action) {
      state.movies = action.payload;
    },
    loadCurrentMovie(state, action) {
      state.currentMovie = action.payload;
    },
    showMoreMovies(state) {
      state.showedMoviesCount += CUT_LENGTH;
    },
    setDefaultMoviesCount(state) {
      state.showedMoviesCount = CUT_LENGTH;
    },
    updateUserDetails(
      state,
      action: PayloadAction<{ movieId: number; userDetails: UserDetails }>,
    ) {
      state.movies = state.movies.map((item) =>
        item.id === action.payload.movieId
          ? { ...item, userDetails: action.payload.userDetails }
          : item,
      );
      state.currentMovie =
        action.payload.movieId === state.currentMovie.id &&
        window.location.href !== API_URL
          ? { ...state.currentMovie, userDetails: action.payload.userDetails }
          : state.currentMovie;
    },
    setMoviesLoadingStatus(state, action) {
      state.isMoviesLoading = action.payload;
    },
    resetCurrentMovie(state) {
      state.currentMovie = {} as Movie;
    },
  },
});

export const Operation = {
  loadMovies: (): AppThunk => async (dispatch) => {
    dispatch(movieSlice.actions.setMoviesLoadingStatus(true));
    const loadedMovies = await MoviesService.loadMovies();
    dispatch(movieSlice.actions.loadMovies(loadedMovies));
    dispatch(movieSlice.actions.setMoviesLoadingStatus(false));
  },

  loadMovie:
    (movieId: number): AppThunk =>
    async (dispatch) => {
      const movie = await MoviesService.loadMovie(movieId);
      dispatch(movieSlice.actions.loadCurrentMovie(movie));
    },

  updateUserDetails:
    (movieId: number, userDetails: UserDetailsToUpdate): AppThunk =>
    async (dispatch) => {
      const updatedUserDetails = await MoviesService.updateUserDetails(
        movieId,
        userDetails,
      );
      dispatch(
        movieSlice.actions.updateUserDetails({
          movieId,
          userDetails: updatedUserDetails,
        }),
      );
    },
};

export const { resetCurrentMovie, showMoreMovies } = movieSlice.actions;

export default movieSlice.reducer;
