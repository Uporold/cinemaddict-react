import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Movie } from "../../../../types";
import { PagePath } from "../../../../const";
import { FilmCardInfo } from "./components/film-card-info";
import { FilmCardControls } from "./components/film-card-controls";
import { useStore } from "../../../../store";

interface Props {
  movie: Movie;
}

export const FilmCard: React.FC<Props> = observer(({ movie }): JSX.Element => {
  const { id, commentsCount } = movie;
  const {
    authStore: { authorizationStatus },
  } = useStore();
  return (
    <article className="film-card">
      <FilmCardInfo movie={movie} isAuth={authorizationStatus} />
      <div className="film-card__bottom-container">
        <Link to={PagePath.MOVIE(id)} className="film-card__comments">
          {commentsCount} comments
        </Link>
        {authorizationStatus && movie.userDetails && (
          <FilmCardControls movie={movie} />
        )}
      </div>
    </article>
  );
});
