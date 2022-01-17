import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { RESET_MOVIES } from "../movie";

export const useResetMovies = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(RESET_MOVIES());
  }, [dispatch]);
};
