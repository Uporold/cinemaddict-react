import { useCallback } from "react";
import { ActionCreator } from "../movie";
import { useStoreDispatch } from "../../reducer";

export const useShowMoreMovies = (): (() => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.showMoreMovies());
  }, [dispatch]);
};
