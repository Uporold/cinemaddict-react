import { SortType } from "../const";
import { Movie } from "../types";

export const getMoviesBySort = (movies: Movie[], sortType: string): Movie[] => {
  switch (sortType) {
    case SortType.DATE:
      return movies
        .slice()
        .sort(
          (a, b) =>
            new Date(b.releaseDate).valueOf() -
            new Date(a.releaseDate).valueOf(),
        );
    case SortType.RATING:
      return movies
        .slice()
        .sort(
          (firstMovie, secondMovie) => secondMovie.rating - firstMovie.rating,
        );
    default:
      return movies;
  }
};
