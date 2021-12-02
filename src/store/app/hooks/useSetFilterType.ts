import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFilterType } from "../app";

export const useSetFilterType = (): ((filterType: string) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (filterType) => {
      dispatch(setFilterType(filterType));
    },
    [dispatch],
  );
};
