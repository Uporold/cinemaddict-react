import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../movie";

export const useLoadMovie = () => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId: number) => {
      dispatch(Operation.loadMovie(movieId));
    },
    [dispatch],
  );
};
