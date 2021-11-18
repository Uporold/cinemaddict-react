import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMovie } from "../../store/movie/hooks/selectors";
import { FilmDetailsInfo } from "./components/film-details-info";
import { FilmDetailsControls } from "./components/film-details-controls";
import { useLoadMovieComments } from "../../store/comment/hooks/useLoadMovieComments";
import { FilmDetailsComments } from "./components/film-details-comments";
import { FilmDetailsCommentForm } from "./components/film-details-comment-form";
import { useLoadMovie } from "../../store/movie/hooks/useLoadMovie";
import { useAuthorizationStatus } from "../../store/auth/hooks/selectors";
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";

interface MatchParams {
  id: string;
}

type Props = RouteComponentProps<MatchParams>;

export const FilmDetails: React.FC<Props> = ({ match }): JSX.Element => {
  const movieId = Number(match.params.id);
  const loadCurrentMovie = useLoadMovie();
  const movie = useMovie();
  const loadMovieComments = useLoadMovieComments();
  const isAuth = useAuthorizationStatus();

  useEffect(() => {
    loadCurrentMovie(movieId);
    loadMovieComments(movieId);
  }, [loadCurrentMovie, loadMovieComments, movieId]);

  return movie.id ? (
    <section className="film-details">
      <div className="form-details__top-container">
        <FilmDetailsInfo movie={movie} />
        {isAuth && movie.userDetails && <FilmDetailsControls movie={movie} />}
      </div>

      <div className="form-details__bottom-container">
        <FilmDetailsComments />
        {isAuth && <FilmDetailsCommentForm movieId={movie.id} />}
      </div>
    </section>
  ) : (
    <LoadingSpinner />
  );
};
