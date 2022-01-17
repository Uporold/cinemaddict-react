import { useCallback } from "react";
import { ActionCreator } from "../comment";
import { useStoreDispatch } from "../../reducer";

export const useResetComments = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetComments());
  }, [dispatch]);
};
