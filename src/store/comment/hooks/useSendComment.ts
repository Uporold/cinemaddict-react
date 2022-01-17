import { useCallback } from "react";
import { Operation } from "../comment";
import { useStoreDispatch } from "../../reducer";

export const useSendComment = () => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId, comment) => {
      return dispatch(Operation.sendComment(movieId, comment));
    },
    [dispatch],
  );
};
