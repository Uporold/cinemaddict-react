import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { FilmDetailsInfo } from "./components/film-details-info";
import { FilmDetailsControls } from "./components/film-details-controls";
import { FilmDetailsComments } from "./components/film-details-comments";
import { FilmDetailsCommentForm } from "./components/film-details-comment-form";
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";
import { useStore } from "../../store";
import history from "../../history";
import { PagePath } from "../../const";
import { useKeypress } from "../../hooks/useKeypress";

interface MatchParams {
  id: string;
}

type Props = RouteComponentProps<MatchParams>;

export const FilmDetails: React.FC<Props> = observer(
  ({ match }): JSX.Element => {
    const movieId = Number(match.params.id);
    const {
      movieStore: { loadMovie, currentMovie, isMovieLoaded, resetCurrentMovie },
      authStore: { authorizationStatus },
      commentStore: { loadMovieComments, resetComments },
    } = useStore();

    const goToMainPageHandler = () => {
      history.push(PagePath.MAIN);
      resetCurrentMovie();
      resetComments();
    };

    useKeypress("Escape", goToMainPageHandler);

    useEffect(() => {
      loadMovie(movieId);
      loadMovieComments(movieId);
    }, [loadMovie, loadMovieComments, movieId]);

    return isMovieLoaded ? (
      <section className="film-details">
        <div className="form-details__top-container">
          <FilmDetailsInfo
            movie={currentMovie}
            exitHandler={goToMainPageHandler}
          />
          {authorizationStatus && currentMovie.userDetails && (
            <FilmDetailsControls movie={currentMovie} />
          )}
        </div>

        <div className="form-details__bottom-container">
          <FilmDetailsComments movieId={currentMovie.id} />
          {authorizationStatus && (
            <FilmDetailsCommentForm movieId={currentMovie.id} />
          )}
        </div>
      </section>
    ) : (
      <LoadingSpinner />
    );
  },
);
