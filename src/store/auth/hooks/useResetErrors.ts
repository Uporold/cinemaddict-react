import { useCallback } from "react";
import { ActionCreator } from "../auth";
import { useStoreDispatch } from "../../reducer";

export const useResetErrors = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetErrors());
  }, [dispatch]);
};
