import { FilterType } from "../const";
import { Movie } from "../types";

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
