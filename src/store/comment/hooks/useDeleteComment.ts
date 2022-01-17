import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useDeleteComment = (): ((
  commentId: number,
  movieId: number,
) => void) => {
  const dispatch = useStoreDispatch();
  return useCallback(
    (commentId, movieId) => {
      dispatch.comments.deleteComment({
        commentId,
        movieId,
      });
    },
    [dispatch],
  );
};
