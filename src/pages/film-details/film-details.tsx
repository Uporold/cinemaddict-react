import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  useMovie,
  useMovieLoadingStatus,
} from "../../store/movie/hooks/selectors";
import { FilmDetailsInfo } from "./components/film-details-info";
import { FilmDetailsControls } from "./components/film-details-controls";
import { useLoadMovieComments } from "../../store/comment/hooks/useLoadMovieComments";
import { FilmDetailsComments } from "./components/film-details-comments";
import { FilmDetailsCommentForm } from "./components/film-details-comment-form";
import { useLoadMovie } from "../../store/movie/hooks/useLoadMovie";
import { useAuthorizationStatus } from "../../store/auth/hooks/selectors";
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";
import { useResetCurrentMovie } from "../../store/movie/hooks/useResetCurrentMovie";
import history from "../../history";
import { PagePath } from "../../const";
import { useKeypress } from "../../hooks/useKeypress";
import { useResetComments } from "../../store/comment/hooks/useResetComments";

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
  const isLoaded = useMovieLoadingStatus();
  const resetCurrentMovie = useResetCurrentMovie();
  const resetComments = useResetComments();

  const goToMainPageHandler = () => {
    history.push(PagePath.MAIN);
    resetCurrentMovie();
    resetComments();
  };

  useKeypress("Escape", goToMainPageHandler);

  useEffect(() => {
    loadCurrentMovie(movieId);
    loadMovieComments(movieId);
  }, [loadCurrentMovie, loadMovieComments, movieId]);

  return isLoaded ? (
    <section className="film-details">
      <div className="form-details__top-container">
        <FilmDetailsInfo movie={movie} exitHandler={goToMainPageHandler} />
        {isAuth && movie.userDetails && <FilmDetailsControls movie={movie} />}
      </div>

      <div className="form-details__bottom-container">
        <FilmDetailsComments movieId={movieId} />
        {isAuth && <FilmDetailsCommentForm movieId={movie.id} />}
      </div>
    </section>
  ) : (
    <LoadingSpinner />
  );
};
