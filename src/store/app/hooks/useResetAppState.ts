import { useCallback } from "react";
import { ActionCreator } from "../app";
import { useStoreDispatch } from "../../reducer";

export const useResetAppState = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetAppState());
  }, [dispatch]);
};
