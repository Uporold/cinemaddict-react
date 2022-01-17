import { createSelector } from "reselect";
import { RootState } from "../reducer";
import { Movie } from "../../types";
import { getMoviesByFilter } from "../../utils/filter";
import { getMoviesBySort } from "../../utils/sorting";
import { getFilterType, getSortType } from "../app/selectors";
import { getUserRank } from "../../utils/common";

export const getMovies = (state: RootState): Movie[] => state.movies.movies;

export const getRank = createSelector(getMovies, (movies) =>
  getUserRank(movies),
);

export const getMovie = (state: RootState): Movie => state.movies.currentMovie;

export const getShowedMoviesCount = (state: RootState): number =>
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

export const getMoviesCountByCurrentFilter = createSelector(
  getMovies,
  getFilterType,
  (movies, filterType) => {
    return getMoviesByFilter(movies, filterType).length;
  },
);

export const getMoviesCountByFilter = (filterType: string) =>
  createSelector(getMovies, (movies) => {
    return getMoviesByFilter(movies, filterType).length;
  });

export const getCurrentMovie = (id: number) =>
  createSelector(getMovies, (movies) =>
    movies.find((movie) => movie.id === Number(id)),
  );

export const getMoviesLoadingStatus = (state: RootState): boolean =>
  state.movies.isMoviesLoaded;

export const getMovieLoadingStatus = (state: RootState): boolean =>
  state.movies.isMovieLoaded;
