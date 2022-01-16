import React from "react";
import { observer } from "mobx-react-lite";
import { FilmsList } from "../../../components/films-list/films-list";
import { useStore } from "../../../store";

export const FilmsSection: React.FC = observer((): JSX.Element => {
  const {
    movieStore: {
      showedSortedFilteredMovies,
      topRatedMovies,
      mostCommentedMovies,
    },
  } = useStore();

  return (
    <section className="films">
      <FilmsList
        movies={showedSortedFilteredMovies}
        title="All movies. Upcoming"
      />
      <FilmsList movies={topRatedMovies} title="Top rated" isExtra />
      <FilmsList movies={mostCommentedMovies} title="Most commented" isExtra />
    </section>
  );
});
