import { SortType } from "../const";
import { Movie } from "../types";

export const getMoviesBySort = (movies: Movie[], sortType: string): Movie[] => {
  switch (sortType) {
    case SortType.DATE:
      return movies
        .slice()
        .sort(
          (a, b) =>
            b.filmInfo.releaseDate.valueOf() - a.filmInfo.releaseDate.valueOf(),
        );
    case SortType.RATING:
      return movies
        .slice()
        .sort(
          (firstMovie, secondMovie) =>
            secondMovie.filmInfo.rating - firstMovie.filmInfo.rating,
        );
    default:
      return movies;
  }
};
