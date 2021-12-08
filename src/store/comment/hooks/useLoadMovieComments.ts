import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../comment";

export const useLoadMovieComments = (): ((movieId: number) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId) => {
      dispatch(Operation.loadMovieComments(movieId));
    },
    [dispatch],
  );
};
