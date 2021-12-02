import React from "react";
import { FilmCard } from "./components/film-card/film-card";
import { ShowMoreButton } from "./components/show-more-button";
import { Movie } from "../../types";
import { useMovies } from "../../store/movie/hooks/selectors";
import { useShowMoreMovies } from "../../store/movie/hooks/useShowMoreMovies";
import { getFilterItemCount } from "../../utils/filter";
import { useCurrentFilterType } from "../../store/app/hooks/selectors";

interface Props {
  movies: Movie[];
  title: string;
  isExtra?: boolean;
}

const defaultProps = {
  isExtra: false,
};

export const FilmsList: React.FC<Props> = ({
  movies,
  title,
  isExtra,
}): JSX.Element => {
  const allMovies = useMovies();
  const getMoviesCountByFilter = getFilterItemCount(allMovies);
  const showMoreMovies = useShowMoreMovies();
  const currentFilterType = useCurrentFilterType();
  return (
    <section className={`films-list${isExtra ? `--extra` : ``}`}>
      <h2 className={`films-list__title ${isExtra ? `` : `visually-hidden`}`}>
        {title || `All movies. Upcoming`}
      </h2>
      <div className="films-list__container">
        {movies.map((movie) => (
          <FilmCard key={movie.id + movie.title} movie={movie} />
        ))}
      </div>
      {movies.length < getMoviesCountByFilter(currentFilterType) &&
        !isExtra && <ShowMoreButton onShowMoreButtonClick={showMoreMovies} />}
    </section>
  );
};

FilmsList.defaultProps = defaultProps;
