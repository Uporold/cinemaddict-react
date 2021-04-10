import React from "react";
import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Sorting from "../../components/sorting/sorting";
import FilmsSection from "../../components/films-section/films-section";

const Main: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="main">
        <Navigation />
        <Sorting />
        <FilmsSection />
      </main>
    </>
  );
};

export default Main;
