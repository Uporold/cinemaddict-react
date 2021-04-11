import React from "react";
import FilmsList from "../films-list/films-list";
import { useShowedMovies } from "../../redux/data/hooks/selectors";
import {
  useMostCommentedMovies,
  useTopRatedMovies,
} from "../../redux/app/hooks/selectors";

const FilmsSection: React.FC = (): JSX.Element => {
  const showedMovies = useShowedMovies();
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

export default FilmsSection;
