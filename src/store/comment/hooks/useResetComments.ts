import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { RESET_COMMENTS } from "../comment";

export const useResetComments = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(RESET_COMMENTS());
  }, [dispatch]);
};
