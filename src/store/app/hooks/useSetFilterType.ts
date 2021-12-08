import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { SET_FILTER_TYPE } from "../app";

export const useSetFilterType = (): ((filterType: string) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (filterType) => {
      dispatch(SET_FILTER_TYPE(filterType));
    },
    [dispatch],
  );
};
