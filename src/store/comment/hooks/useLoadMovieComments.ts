import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useLoadMovieComments = (): ((movieId: number) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId) => {
      dispatch.comments.loadMovieComments(movieId);
    },
    [dispatch],
  );
};
