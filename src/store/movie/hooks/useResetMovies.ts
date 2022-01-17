import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useResetMovies = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch.movies.RESET_MOVIES();
  }, [dispatch]);
};
