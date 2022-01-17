import { useCallback } from "react";
import { ActionCreator } from "../movie";
import { useStoreDispatch } from "../../reducer";

export const useResetMovies = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetMovies());
  }, [dispatch]);
};
