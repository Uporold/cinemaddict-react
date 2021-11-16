import { useSelector } from "react-redux";
import { Movie } from "../../../types";
import {
  getCurrentMovie,
  getMovie,
  getMovies,
  getMoviesLoadingStatus,
  getShowedMovies,
  getShowedSortedFilteredMovies,
} from "../selectors";

export const useMovies = (): Movie[] => useSelector(getMovies);

export const useMovie = (): Movie => useSelector(getMovie);

export const useShowedMovies = (): Movie[] => {
  return useSelector(getShowedMovies);
};

export const useShowedSortedFilteredMovies = (): Movie[] => {
  return useSelector(getShowedSortedFilteredMovies);
};

export const useCurrentMovie = (id: number): Movie => {
  return useSelector(getCurrentMovie(id)) as Movie;
};

export const useMoviesLoadingStatus = (): boolean => {
  return useSelector(getMoviesLoadingStatus);
};
