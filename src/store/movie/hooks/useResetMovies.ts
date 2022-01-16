import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { ActionCreator } from "../movie";

export const useResetMovies = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetMovies());
  }, [dispatch]);
};
