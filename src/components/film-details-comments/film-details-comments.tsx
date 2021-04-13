import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useMovieComments } from "../../redux/data/hooks/selectors";

dayjs.extend(relativeTime);

const FilmDetailsComments: React.FC = (): JSX.Element => {
  const comments = useMovieComments();
  return (
    <section className="film-details__comments-wrap">
      <h3 className="film-details__comments-title">
        Comments{" "}
        <span className="film-details__comments-count">{comments.length}</span>
      </h3>
      <ul className="film-details__comments-list">
        {comments.map((comment) => (
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
                <button className="film-details__comment-delete" type="button">
                  Delete
                </button>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilmDetailsComments;
