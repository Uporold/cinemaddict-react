import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useSetFilterType = (): ((filterType: string) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (filterType) => {
      dispatch.app.SET_FILTER_TYPE(filterType);
    },
    [dispatch],
  );
};
