import { useCallback } from "react";
import { Operation } from "../comment";
import { useStoreDispatch } from "../../reducer";

export const useDeleteComment = (): ((
  commentId: number,
  movieId: number,
) => void) => {
  const dispatch = useStoreDispatch();
  return useCallback(
    (commentId, movieId) => {
      dispatch(Operation.deleteComment(commentId, movieId));
    },
    [dispatch],
  );
};
