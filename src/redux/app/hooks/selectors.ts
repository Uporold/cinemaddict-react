import { useSelector } from "react-redux";
import { getFilterType } from "../selectors";

export const useCurrentFilterType = (): string => {
  return useSelector(getFilterType);
};
