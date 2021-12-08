import { createSelector } from "reselect";
import { GlobalState } from "../reducer";
import { Movie } from "../../types";
import { getMoviesByFilter } from "../../utils/filter";
import { getMoviesBySort } from "../../utils/sorting";
import { getFilterType, getSortType } from "../app/selectors";

export const getMovies = (state: GlobalState): Movie[] => state.movies.movies;

export const getMovie = (state: GlobalState): Movie =>
  state.movies.currentMovie;

export const getShowedMoviesCount = (state: GlobalState): number =>
  state.movies.showedMoviesCount;

export const getShowedMovies = createSelector(
  getMovies,
  getShowedMoviesCount,
  (movies, count) => movies.slice(0, count),
);

export const getTopRatedMovies = createSelector(getMovies, (movies) =>
  movies
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 2),
);

export const getMostCommentedMovies = createSelector(getMovies, (movies) =>
  movies
    .slice()
    .sort((a, b) => b.commentsCount - a.commentsCount)
    .slice(0, 2),
);

export const getShowedSortedFilteredMovies = createSelector(
  getMovies,
  getShowedMoviesCount,
  getFilterType,
  getSortType,
  (movies, count, filterType, sortType) => {
    return getMoviesByFilter(
      getMoviesBySort(movies, sortType),
      filterType,
    ).slice(0, count);
  },
);

export const getCurrentMovie = (id: number) =>
  createSelector(getMovies, (movies) =>
    movies.find((movie) => movie.id === Number(id)),
  );

export const getMoviesLoadingStatus = (state: GlobalState): boolean =>
  state.movies.isMoviesLoading;
