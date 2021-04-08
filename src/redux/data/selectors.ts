import { GlobalState } from "../reducer";
import { Comment, Movie } from "../../types";

export const getMovies = (state: GlobalState): Movie[] => state.movies;

export const getMovieComments = (state: GlobalState): Comment[] =>
  state.movieComments;
