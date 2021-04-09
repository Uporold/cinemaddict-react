import { FilterType } from "../const";
import { Movie } from "../types";

export const getFilterItemCount = (movies: Movie[]) => (
  filter: string,
): number => {
  switch (filter) {
    case FilterType.FAVORITES:
      return movies.filter((movie) => {
        return movie.userDetails.isInFavorite;
      }).length;
    case FilterType.HISTORY:
      return movies.filter((movie) => {
        return movie.userDetails.isInWatched;
      }).length;
    case FilterType.WATCHLIST:
      return movies.filter((movie) => {
        return movie.userDetails.isInWatchlist;
      }).length;
    default:
      return 0;
  }
};
