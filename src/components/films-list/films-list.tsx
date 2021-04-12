import React from "react";
import FilmCard from "../film-card/film-card";
import ShowMoreButton from "../show-more-button/show-more-button";
import { Movie } from "../../types";
import { useMovies } from "../../redux/data/hooks/selectors";
import { useShowMoreMovies } from "../../redux/data/hooks/useShowMoreMovies";
import { getFilterItemCount } from "../../utils/filter";
import { useCurrentFilterType } from "../../redux/app/hooks/selectors";

interface Props {
  movies: Movie[];
  title?: string;
}

const FilmsList: React.FC<Props> = ({ movies, title }): JSX.Element => {
  const allMovies = useMovies();
  const getMoviesCountByFilter = getFilterItemCount(allMovies);
  const showMoreMovies = useShowMoreMovies();
  const currentFilterType = useCurrentFilterType();
  return (
    <section className={`films-list${title ? `--extra` : ``}`}>
      <h2 className={`films-list__title ${title ? `` : `visually-hidden`}`}>
        {title || `All movies. Upcoming`}
      </h2>
      <div className="films-list__container">
        {movies.map((movie) => (
          <FilmCard movie={movie} />
        ))}
      </div>
      {movies.length < getMoviesCountByFilter(currentFilterType) && !title ? (
        <ShowMoreButton onShowMoreButtonClick={showMoreMovies} />
      ) : (
        ``
      )}
    </section>
  );
};

export default FilmsList;
