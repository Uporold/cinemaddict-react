import React, { useMemo } from "react";
import FilmsList from "../films-list/films-list";
import { useMovies, useShowedMovies } from "../../redux/data/hooks/selectors";

const FilmsSection: React.FC = (): JSX.Element => {
  const movies = useMovies();
  const showedMovies = useShowedMovies();
  const topRatedMovies = movies
    .slice()
    .sort((a, b) => b.filmInfo.rating - a.filmInfo.rating)
    .slice(0, 2);

  const mostCommentedMovies = useMemo(
    () =>
      movies
        .slice()
        .sort((a, b) => b.commentsIds.length - a.commentsIds.length)
        .slice(0, 2),
    [movies],
  );
  return (
    <section className="films">
      <FilmsList movies={showedMovies} />
      <FilmsList movies={topRatedMovies} title="Top rated" />
      <FilmsList movies={mostCommentedMovies} title="Most commented" />
    </section>
  );
};

export default FilmsSection;
