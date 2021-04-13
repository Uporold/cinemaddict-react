import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../data";

export const useLoadMovieComments = (): ((movieId: number) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId) => {
      dispatch(Operation.loadMovieComments(movieId));
    },
    [dispatch],
  );
};
