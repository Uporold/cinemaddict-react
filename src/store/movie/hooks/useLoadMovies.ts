import { useCallback } from "react";
import { Operation } from "../movie";
import { useStoreDispatch } from "../../reducer";

export const useLoadMovies = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(Operation.loadMovies());
  }, [dispatch]);
};
