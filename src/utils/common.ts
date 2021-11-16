import { useEffect, useRef } from "react";
import { Movie } from "../types";
import { UserRank } from "../const";

export const ensure = <T>(
  argument: T | undefined | null,
  message = "This value was promised to be there.",
): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
};

export const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
};

export const getSlicedDescription = (
  description: string,
  length: number,
): string => {
  if (description.length > length) {
    return `${description.slice(0, length)}..`;
  }
  return description;
};

export const getUserRank = (movies: Movie[]): string => {
  const watchedMovies = movies.filter((movie) => movie.userDetails?.isWatched)
    .length;
  switch (true) {
    case watchedMovies >= UserRank.NOVICE.minMovies &&
      watchedMovies < UserRank.FUN.minMovies:
      return UserRank.NOVICE.rank;
    case watchedMovies >= UserRank.FUN.minMovies &&
      watchedMovies < UserRank.MOVIE_BUFF.minMovies:
      return UserRank.FUN.rank;
    case watchedMovies >= UserRank.MOVIE_BUFF.minMovies:
      return UserRank.MOVIE_BUFF.rank;
    default:
      return ``;
  }
};
