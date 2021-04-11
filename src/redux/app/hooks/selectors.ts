import { useSelector } from "react-redux";
import { getFilterType, getSortType } from "../selectors";
import {
  getMostCommentedMovies,
  getTopRatedMovies,
} from "../../data/selectors";
import { Movie } from "../../../types";

export const useCurrentFilterType = (): string => {
  return useSelector(getFilterType);
};

export const useCurrentSortType = (): string => {
  return useSelector(getSortType);
};

export const useTopRatedMovies = (): Movie[] => {
  return useSelector(getTopRatedMovies);
};

export const useMostCommentedMovies = (): Movie[] => {
  return useSelector(getMostCommentedMovies);
};
