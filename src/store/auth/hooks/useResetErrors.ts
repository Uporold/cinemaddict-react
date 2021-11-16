import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { ActionCreator } from "../auth";

export const useResetErrors = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetErrors());
  }, [dispatch]);
};
