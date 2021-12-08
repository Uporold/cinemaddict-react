import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useSetStatisticMode = (): (() => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch.app.OPEN_STATISTIC();
  }, [dispatch]);
};
