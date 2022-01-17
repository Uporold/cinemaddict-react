import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useResetComments = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch.comments.RESET_COMMENTS();
  }, [dispatch]);
};
