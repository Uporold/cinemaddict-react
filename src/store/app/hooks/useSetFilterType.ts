import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetFilterType = (): ((filterType: string) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (filterType) => {
      dispatch(ActionCreator.setFilterType(filterType));
    },
    [dispatch],
  );
};
