import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../comment";

export const useDeleteComment = (): ((commentId: number) => void) => {
  const dispatch = useStoreDispatch();
  return useCallback(
    (commentId) => {
      dispatch(Operation.deleteComment(commentId));
    },
    [dispatch],
  );
};
