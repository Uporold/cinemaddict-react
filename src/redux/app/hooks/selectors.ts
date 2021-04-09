import { useSelector } from "react-redux";
import { getFilterType, getSortType } from "../selectors";

export const useCurrentFilterType = (): string => {
  return useSelector(getFilterType);
};

export const useCurrentSortType = (): string => {
  return useSelector(getSortType);
};
