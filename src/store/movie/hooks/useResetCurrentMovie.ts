import { useCallback } from "react";
import { ActionCreator } from "../movie";
import { useStoreDispatch } from "../../reducer";

export const useResetCurrentMovie = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetCurrentMovie());
  }, [dispatch]);
};
