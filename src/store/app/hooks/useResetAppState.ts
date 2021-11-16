import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useResetAppState = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetAppState());
  }, [dispatch]);
};
