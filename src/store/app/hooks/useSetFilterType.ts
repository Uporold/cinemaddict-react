import { useCallback } from "react";
import { ActionCreator } from "../app";
import { useStoreDispatch } from "../../reducer";

export const useSetFilterType = (): ((filterType: string) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (filterType) => {
      dispatch(ActionCreator.setFilterType(filterType));
    },
    [dispatch],
  );
};
