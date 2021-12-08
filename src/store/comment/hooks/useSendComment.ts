import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { CommentPure } from "../../../types";

export const useSendComment = (): ((
  movieId: number,
  comment: CommentPure,
) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId, comment) => {
      dispatch.comments.sendComment({
        movieId,
        comment,
      });
    },
    [dispatch],
  );
};
