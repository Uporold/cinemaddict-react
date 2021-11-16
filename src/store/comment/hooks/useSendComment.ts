import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../comment";
import { CommentPure } from "../../../types";

export const useSendComment = (): ((
  movieId: number,
  comment: CommentPure,
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId, comment) => {
      dispatch(Operation.sendComment(movieId, comment));
    },
    [dispatch],
  );
};
