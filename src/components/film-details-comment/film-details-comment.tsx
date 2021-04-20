import React, { memo } from "react";
import dayjs from "dayjs";
import { Comment } from "../../types";
import { useDeleteComment } from "../../redux/data/hooks/useDeleteComment";

interface Props {
  comment: Comment;
}

const FilmDetailsComment: React.FC<Props> = memo(
  ({ comment }): JSX.Element => {
    const deleteComment = useDeleteComment();
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
          <p className="film-details__comment-text">{comment.comment}</p>
          <p className="film-details__comment-info">
            <span className="film-details__comment-author">
              {comment.author}
            </span>
            <span className="film-details__comment-day">
              {dayjs().to(comment.date)}
            </span>
            <button
              className="film-details__comment-delete"
              type="button"
              onClick={() => {
                deleteComment(comment.id);
              }}
            >
              Delete
            </button>
          </p>
        </div>
      </li>
    );
  },
);

export default FilmDetailsComment;
