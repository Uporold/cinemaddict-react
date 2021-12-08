import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../movie";
import { UserDetailsToUpdate } from "../../../types";

export const useUpdateUserDetails = (): ((
  movieId: number,
  userDetails: UserDetailsToUpdate,
) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId, userDetails) => {
      dispatch(Operation.updateUserDetails(movieId, userDetails));
    },
    [dispatch],
  );
};
