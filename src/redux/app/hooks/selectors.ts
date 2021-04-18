import { useSelector } from "react-redux";
import {
  getFilterType,
  getFormBlockedStatus,
  getFormErrorStatus,
  getSortType,
  getStatisticStatus,
} from "../selectors";
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

export const useStatisticStatus = (): boolean => {
  return useSelector(getStatisticStatus);
};

export const useTopRatedMovies = (): Movie[] => {
  return useSelector(getTopRatedMovies);
};

export const useMostCommentedMovies = (): Movie[] => {
  return useSelector(getMostCommentedMovies);
};

export const useFormBlockedStatus = (): boolean => {
  return useSelector(getFormBlockedStatus);
};

export const useFormErrorStatus = (): boolean => {
  return useSelector(getFormErrorStatus);
};
