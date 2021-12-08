import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { RESET_CURRENT_MOVIE } from "../movie";

export const useResetCurrentMovie = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(RESET_CURRENT_MOVIE());
  }, [dispatch]);
};
