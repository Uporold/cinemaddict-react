import { useSelector } from "react-redux";
import { Comment, Movie } from "../../../types";
import {
  getCurrentMovie,
  getMovieComments,
  getMovies,
  getShowedMovies,
  getShowedSortedFilteredMovies,
} from "../selectors";

export const useMovies = (): Movie[] => useSelector(getMovies);

export const useMovieComments = (): Comment[] => useSelector(getMovieComments);

export const useShowedMovies = (): Movie[] => {
  return useSelector(getShowedMovies);
};

export const useShowedSortedFilteredMovies = (): Movie[] => {
  return useSelector(getShowedSortedFilteredMovies);
};

export const useCurrentMovie = (id: number): Movie => {
  return useSelector(getCurrentMovie(id)) as Movie;
};
