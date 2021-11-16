import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../movie";
import { UserDetailsToUpdate } from "../../../types";

export const useUpdateUserDetails = (): ((
  movieId: number,
  userDetails: UserDetailsToUpdate,
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId, userDetails) => {
      dispatch(Operation.updateUserDetails(movieId, userDetails));
    },
    [dispatch],
  );
};
