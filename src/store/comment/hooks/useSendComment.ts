import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../comment";
import { CommentPure } from "../../../types";

export const useSendComment = (): ((
  movieId: number,
  comment: CommentPure,
) => Promise<boolean>) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (movieId, comment) => {
      return dispatch(Operation.sendComment(movieId, comment));
    },
    [dispatch],
  );
};
