import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../movie";

export const useLoadMovies = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(Operation.loadMovies());
  }, [dispatch]);
};
