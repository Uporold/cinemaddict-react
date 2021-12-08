import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useResetErrors = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch.auth.RESET_FORM_ERRORS();
  }, [dispatch]);
};
