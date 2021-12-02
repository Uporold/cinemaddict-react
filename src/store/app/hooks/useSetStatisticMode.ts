import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetStatisticMode = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.openStatistic());
  }, [dispatch]);
};
