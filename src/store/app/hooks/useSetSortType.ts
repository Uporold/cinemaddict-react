import { useCallback } from "react";
import { ActionCreator } from "../app";
import { useStoreDispatch } from "../../reducer";

export const useSetSortType = (): ((sortType: string) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (sortType) => {
      dispatch(ActionCreator.setSortType(sortType));
    },
    [dispatch],
  );
};
