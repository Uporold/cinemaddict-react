import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useResetAppState = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch.app.RESET_APP_STATE();
  }, [dispatch]);
};
