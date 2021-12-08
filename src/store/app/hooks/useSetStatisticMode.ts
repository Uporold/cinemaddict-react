import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { OPEN_STATISTIC } from "../app";

export const useSetStatisticMode = (): (() => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(OPEN_STATISTIC());
  }, [dispatch]);
};
