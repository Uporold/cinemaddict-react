import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { ActionCreator } from "../comment";

export const useResetComments = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetComments());
  }, [dispatch]);
};
