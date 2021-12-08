import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useLoadMovie = () => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId: number) => {
      dispatch.movies.loadMovie(movieId);
    },
    [dispatch],
  );
};
