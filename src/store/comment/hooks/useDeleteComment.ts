import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";

export const useDeleteComment = (): ((commentId: number) => void) => {
  const dispatch = useStoreDispatch();
  return useCallback(
    (commentId) => {
      dispatch.comments.deleteComment(commentId);
    },
    [dispatch],
  );
};
