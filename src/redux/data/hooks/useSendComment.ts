import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { CommentPure } from "../../../types";
import { Operation } from "../data";

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
