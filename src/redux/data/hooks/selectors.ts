import { useSelector } from "react-redux";
import { Comment, Movie } from "../../../types";
import { getMovieComments, getMovies, getShowedMovies } from "../selectors";

export const useMovies = (): Movie[] => useSelector(getMovies);

export const useMovieComments = (): Comment[] => useSelector(getMovieComments);

export const useShowedMovies = (): Movie[] => {
  return useSelector(getShowedMovies);
};
