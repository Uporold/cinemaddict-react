import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useSetSortType = (): ((sortType: string) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (sortType) => {
      dispatch.app.SET_SORT_TYPE(sortType);
    },
    [dispatch],
  );
};
