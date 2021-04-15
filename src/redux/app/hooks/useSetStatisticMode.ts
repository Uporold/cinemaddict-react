import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetStatisticMode = (): ((status: boolean) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (status) => {
      dispatch(ActionCreator.setStatisticsMode(status));
    },
    [dispatch],
  );
};
