import { FilterType } from "../const";
import { Movie } from "../types";

export const getFilterItemCount =
  (movies: Movie[]) =>
  (filter: string): number => {
    switch (filter) {
      case FilterType.FAVORITES:
        return movies.filter((movie) => {
          return movie.userDetails?.isFavorite;
        }).length;
      case FilterType.HISTORY:
        return movies.filter((movie) => {
          return movie.userDetails?.isWatched;
        }).length;
      case FilterType.WATCHLIST:
        return movies.filter((movie) => {
          return movie.userDetails?.isInWatchlist;
        }).length;
      default:
        return movies.length;
    }
  };

export const getMoviesByFilter = (
  movies: Movie[],
  filterType: string,
): Movie[] => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return movies.filter((movie) => movie.userDetails?.isInWatchlist);
    case FilterType.HISTORY:
      return movies.filter((movie) => movie.userDetails?.isWatched);
    case FilterType.FAVORITES:
      return movies.filter((movie) => movie.userDetails?.isFavorite);
    default:
      return movies;
  }
};
