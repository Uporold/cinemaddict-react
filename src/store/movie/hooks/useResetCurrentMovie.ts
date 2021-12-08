import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useResetCurrentMovie = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch.movies.RESET_CURRENT_MOVIE();
  }, [dispatch]);
};
