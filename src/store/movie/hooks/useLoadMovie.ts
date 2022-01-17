import { useCallback } from "react";
import { Operation } from "../movie";
import { useStoreDispatch } from "../../reducer";

export const useLoadMovie = () => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId: number) => {
      dispatch(Operation.loadMovie(movieId));
    },
    [dispatch],
  );
};
