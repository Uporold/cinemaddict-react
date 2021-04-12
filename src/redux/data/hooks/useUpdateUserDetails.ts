import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../data";
import { MovieBackend } from "../../../types";

export const useUpdateUserDetails = (): ((movie: MovieBackend) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (movie) => {
      dispatch(Operation.updateUserDetails(movie));
    },
    [dispatch],
  );
};
