import { useCallback } from "react";
import { ActionCreator } from "../app";
import { useStoreDispatch } from "../../reducer";

export const useSetStatisticMode = (): (() => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.openStatistic());
  }, [dispatch]);
};
