import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { ActionCreator } from "../movie";

export const useShowMoreMovies = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.showMoreMovies());
  }, [dispatch]);
};
