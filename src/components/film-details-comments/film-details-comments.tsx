import React, { memo } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useMovieComments } from "../../redux/data/hooks/selectors";
import FilmDetailsComment from "../film-details-comment/film-details-comment";

dayjs.extend(relativeTime);

const FilmDetailsComments: React.FC = memo(
  (): JSX.Element => {
    const comments = useMovieComments();
    return (
      <section className="film-details__comments-wrap">
        <h3 className="film-details__comments-title">
          Comments{" "}
          <span className="film-details__comments-count">
            {comments.length}
          </span>
        </h3>
        <ul className="film-details__comments-list">
          {comments.map((comment) => (
            <FilmDetailsComment key={comment.id} comment={comment} />
          ))}
        </ul>
      </section>
    );
  },
);

export default FilmDetailsComments;
