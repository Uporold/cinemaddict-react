import React, { memo } from "react";
import dayjs from "dayjs";
import { Comment } from "../../../types";
import { useDeleteComment } from "../../../store/comment/hooks/useDeleteComment";
import { useUser } from "../../../store/auth/hooks/selectors";

interface Props {
  comment: Comment;
  movieId: number;
}

export const FilmDetailsComment: React.FC<Props> = memo(
  ({ comment, movieId }): JSX.Element => {
    const deleteComment = useDeleteComment();
    const user = useUser();
    return (
      <li className="film-details__comment">
        <span className="film-details__comment-emoji">
          <img
            src={`/images/emoji/${comment.emotion}.png`}
            width="55"
            height="55"
            alt={`emoji-${comment.emotion}`}
          />
        </span>
        <div>
          <p className="film-details__comment-text">{comment.message}</p>
          <p className="film-details__comment-info">
            <span className="film-details__comment-author">
              {comment.user.name}
            </span>
            <span className="film-details__comment-day">
              {dayjs().to(comment.creationDate)}
            </span>
            {user?.id === comment.user.id && (
              <button
                className="film-details__comment-delete"
                type="button"
                onClick={() => {
                  deleteComment(comment.id, movieId);
                }}
              >
                Delete
              </button>
            )}
          </p>
        </div>
      </li>
    );
  },
);
