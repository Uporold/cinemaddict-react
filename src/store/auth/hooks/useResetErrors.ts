import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { resetErrors } from "../auth";

export const useResetErrors = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(resetErrors());
  }, [dispatch]);
};
