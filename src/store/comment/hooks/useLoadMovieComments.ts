import { useCallback } from "react";
import { Operation } from "../comment";
import { useStoreDispatch } from "../../reducer";

export const useLoadMovieComments = (): ((movieId: number) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId) => {
      dispatch(Operation.loadMovieComments(movieId));
    },
    [dispatch],
  );
};
