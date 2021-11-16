import React from "react";
import { useMovies } from "../../store/movie/hooks/selectors";

export const Footer: React.FC = (): JSX.Element => {
  const movies = useMovies();
  return (
    <footer className="footer">
      <section className="footer__logo logo logo--smaller">Cinemaddict</section>
      <section className="footer__statistics">
        <p>{movies.length} movies inside</p>
      </section>
    </footer>
  );
};
