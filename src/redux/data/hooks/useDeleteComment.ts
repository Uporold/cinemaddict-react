import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../data";

export const useDeleteComment = (): ((commentId: number) => void) => {
  const dispatch = useDispatch();
  return useCallback(
    (commentId) => {
      dispatch(Operation.deleteComment(commentId));
    },
    [dispatch],
  );
};
