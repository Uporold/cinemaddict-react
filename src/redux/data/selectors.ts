import { createSelector } from "reselect";
import { GlobalState } from "../reducer";
import { Comment, Movie } from "../../types";

export const getMovies = (state: GlobalState): Movie[] => state.DATA.movies;

export const getMovieComments = (state: GlobalState): Comment[] =>
  state.DATA.movieComments;

export const getShowedMoviesCount = (state: GlobalState): number =>
  state.DATA.showedMoviesCount;

export const getShowedMovies = createSelector(
  getMovies,
  getShowedMoviesCount,
  (movies, count) => movies.slice(0, count),
);

export const getTopRatedMovies = createSelector(getMovies, (movies) =>
  movies
    .slice()
    .sort((a, b) => b.filmInfo.rating - a.filmInfo.rating)
    .slice(0, 2),
);

export const getMostCommentedMovies = createSelector(getMovies, (movies) =>
  movies
    .slice()
    .sort((a, b) => b.commentsIds.length - a.commentsIds.length)
    .slice(0, 2),
);
