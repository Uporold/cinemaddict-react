import React from "react";
import { useMovies, useShowedMovies } from "../../redux/data/hooks/selectors";
import FilmCard from "../film-card/film-card";
import ShowMoreButton from "../show-more-button/show-more-button";
import { useShowMoreMovies } from "../../redux/data/hooks/useShowMoreMovies";

const FilmsList: React.FC = (): JSX.Element => {
  const movies = useMovies();
  const showedMovies = useShowedMovies();
  const showMoreMovies = useShowMoreMovies();
  return (
    <section className="films-list">
      <h2 className="films-list__title visually-hidden">
        All movies. Upcoming
      </h2>
      <div className="films-list__container">
        {showedMovies.map((movie) => (
          <FilmCard movie={movie} />
        ))}
      </div>
      {showedMovies.length < movies.length ? (
        <ShowMoreButton onShowMoreButtonClick={showMoreMovies} />
      ) : (
        ``
      )}
    </section>
  );
};

export default FilmsList;
