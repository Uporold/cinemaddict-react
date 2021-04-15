import React from "react";
import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Sorting from "../../components/sorting/sorting";
import FilmsSection from "../../components/films-section/films-section";
import Statistic from "../../components/statistic/statistic";
import Footer from "../../components/footer/footer";
import { useStatisticStatus } from "../../redux/app/hooks/selectors";

const Main: React.FC = (): JSX.Element => {
  const isStatOpen = useStatisticStatus();
  return (
    <>
      <Header />
      <main className="main">
        <Navigation />
        {isStatOpen ? (
          <Statistic />
        ) : (
          <>
            <Sorting />
            <FilmsSection />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Main;
