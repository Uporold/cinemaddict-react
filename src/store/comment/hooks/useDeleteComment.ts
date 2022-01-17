import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../comment";

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
