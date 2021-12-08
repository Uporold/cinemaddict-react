import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { SET_SORT_TYPE } from "../app";

export const useSetSortType = (): ((sortType: string) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (sortType) => {
      dispatch(SET_SORT_TYPE(sortType));
    },
    [dispatch],
  );
};
