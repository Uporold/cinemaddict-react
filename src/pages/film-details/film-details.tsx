import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useCurrentMovie } from "../../redux/data/hooks/selectors";
import { useUpdateUserDetailsHandler } from "../../hooks/useUpdateUserDetailsHandler";
import FilmDetailsInfo from "../../components/film-details-info/film-details-info";
import FilmDetailsControls from "../../components/film-details-controls/film-details-controls";
import { useLoadMovieComments } from "../../redux/data/hooks/useLoadMovieComments";
import FilmDetailsComments from "../../components/film-details-comments/film-details-comments";
import FilmDetailsCommentForm from "../../components/film-details-comment-form/film-details-comment-form";

interface MatchParams {
  id: string;
}

type Props = RouteComponentProps<MatchParams>;

const FilmDetails: React.FC<Props> = ({ match }): JSX.Element => {
  const movieId = Number(match.params.id);
  const movie = useCurrentMovie(movieId);
  const updateUserDetailsHandler = useUpdateUserDetailsHandler(movie);
  const loadMovieComments = useLoadMovieComments();

  useEffect(() => {
    loadMovieComments(movieId);
  }, [loadMovieComments, movieId]);

  return (
    <section className="film-details">
      <form className="film-details__inner" action="" method="get">
        <div className="form-details__top-container">
          <FilmDetailsInfo movie={movie} />
          <FilmDetailsControls
            userDetails={movie.userDetails}
            updateUserDetailsHandler={updateUserDetailsHandler}
          />
        </div>

        <div className="form-details__bottom-container">
          <FilmDetailsComments />
          <FilmDetailsCommentForm />
        </div>
      </form>
    </section>
  );
};

export default FilmDetails;
