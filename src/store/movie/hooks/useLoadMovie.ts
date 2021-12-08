import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../movie";

export const useLoadMovie = () => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId: number) => {
      dispatch(Operation.loadMovie(movieId));
    },
    [dispatch],
  );
};
