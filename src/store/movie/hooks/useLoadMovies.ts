import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useLoadMovies = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch.movies.loadMovies();
  }, [dispatch]);
};
