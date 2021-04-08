import { useSelector } from "react-redux";
import { Comment, Movie } from "../../../types";
import { getMovieComments, getMovies } from "../selectors";

export const useMovies = (): Movie[] => useSelector(getMovies);

export const useMovieComments = (): Comment[] => useSelector(getMovieComments);
