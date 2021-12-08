import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../movie";

export const useLoadMovies = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(Operation.loadMovies());
  }, [dispatch]);
};
