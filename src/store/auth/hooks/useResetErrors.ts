import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { RESET_FORM_ERRORS } from "../auth";

export const useResetErrors = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(RESET_FORM_ERRORS());
  }, [dispatch]);
};
