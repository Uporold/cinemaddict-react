import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSortType } from "../app";

export const useSetSortType = (): ((sortType: string) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (sortType) => {
      dispatch(setSortType(sortType));
    },
    [dispatch],
  );
};
