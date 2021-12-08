import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useShowMoreMovies = (): (() => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch.movies.SHOW_MORE_MOVIES();
  }, [dispatch]);
};
