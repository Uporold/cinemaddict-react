import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { FilmDetailsComment } from "./film-details-comment";
import { useStore } from "../../../store";

dayjs.extend(relativeTime);

interface Props {
  movieId: number;
}

export const FilmDetailsComments: React.FC<Props> = observer(
  ({ movieId }): JSX.Element => {
    const {
      commentStore: { comments },
    } = useStore();
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
            <FilmDetailsComment
              key={comment.id}
              comment={comment}
              movieId={movieId}
            />
          ))}
        </ul>
      </section>
    );
  },
);
