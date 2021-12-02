import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { resetAppState } from "../app";

export const useResetAppState = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(resetAppState());
  }, [dispatch]);
};
