import React from "react";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { Comment } from "../../../types";
import { useStore } from "../../../store";

interface Props {
  comment: Comment;
  movieId: number;
}

export const FilmDetailsComment: React.FC<Props> = observer(
  ({ comment, movieId }): JSX.Element => {
    const {
      commentStore: { deleteComment },
      authStore: { user },
    } = useStore();
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
                onClick={async () => {
                  await deleteComment(comment.id, movieId);
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
