import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { ActionCreator } from "../movie";

export const useResetCurrentMovie = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetCurrentMovie());
  }, [dispatch]);
};
