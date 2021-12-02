import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openStatistic } from "../app";

export const useSetStatisticMode = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(openStatistic());
  }, [dispatch]);
};
