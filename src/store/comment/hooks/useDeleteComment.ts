import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../comment";

export const useDeleteComment = (): ((
  commentId: number,
  movieId: number,
) => void) => {
  const dispatch = useDispatch();
  return useCallback(
    (commentId, movieId) => {
      dispatch(Operation.deleteComment(commentId, movieId));
    },
    [dispatch],
  );
};
