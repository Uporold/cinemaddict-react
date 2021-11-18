import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../../../types";
import { PagePath } from "../../../../const";
import { useAuthorizationStatus } from "../../../../store/auth/hooks/selectors";
import { FilmCardInfo } from "./components/film-card-info";
import { FilmCardControls } from "./components/film-card-controls";

interface Props {
  movie: Movie;
}

export const FilmCard: React.FC<Props> = memo(
  ({ movie }): JSX.Element => {
    const { id, commentsCount } = movie;
    const isAuth = useAuthorizationStatus();
    return (
      <article className="film-card">
        <FilmCardInfo movie={movie} isAuth={isAuth} />
        <div className="film-card__bottom-container">
          <Link to={PagePath.MOVIE(id)} className="film-card__comments">
            {commentsCount} comments
          </Link>
          {isAuth && movie.userDetails && <FilmCardControls movie={movie} />}
        </div>
      </article>
    );
  },
);
