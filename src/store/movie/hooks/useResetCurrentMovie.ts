import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { resetCurrentMovie } from "../movie";

export const useResetCurrentMovie = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(resetCurrentMovie());
  }, [dispatch]);
};
