import React from "react";
import { FilmsList } from "../../../components/films-list/films-list";
import { useShowedSortedFilteredMovies } from "../../../store/movie/hooks/selectors";
import {
  useMostCommentedMovies,
  useTopRatedMovies,
} from "../../../store/app/hooks/selectors";

export const FilmsSection: React.FC = (): JSX.Element => {
  const showedMovies = useShowedSortedFilteredMovies();
  const topRatedMovies = useTopRatedMovies();
  const mostCommentedMovies = useMostCommentedMovies();

  return (
    <section className="films">
      <FilmsList movies={showedMovies} />
      <FilmsList movies={topRatedMovies} title="Top rated" />
      <FilmsList movies={mostCommentedMovies} title="Most commented" />
    </section>
  );
};
