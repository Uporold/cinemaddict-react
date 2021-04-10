import React from "react";
import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Sorting from "../../components/sorting/sorting";
import FilmsList from "../../components/films-list/films-list";

const Main: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="main">
        <Navigation />
        <Sorting />
        <section className="films">
          <FilmsList />
        </section>
      </main>
    </>
  );
};

export default Main;
