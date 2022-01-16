import React from "react";
import { useStore } from "../../store";

export const Footer: React.FC = (): JSX.Element => {
  const {
    movieStore: { movies },
  } = useStore();
  return (
    <footer className="footer">
      <section className="footer__logo logo logo--smaller">Cinemaddict</section>
      <section className="footer__statistics">
        <p>{movies.length} movies inside</p>
      </section>
    </footer>
  );
};
