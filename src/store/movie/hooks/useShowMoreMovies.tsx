import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { showMoreMovies } from "../movie";

export const useShowMoreMovies = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(showMoreMovies());
  }, [dispatch]);
};
