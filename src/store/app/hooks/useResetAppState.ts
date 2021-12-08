import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { RESET_APP_STATE } from "../app";

export const useResetAppState = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(RESET_APP_STATE());
  }, [dispatch]);
};
