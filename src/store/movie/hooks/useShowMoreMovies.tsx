import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { SHOW_MORE_MOVIES } from "../movie";

export const useShowMoreMovies = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(SHOW_MORE_MOVIES());
  }, [dispatch]);
};
