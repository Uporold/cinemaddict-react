import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "../../components/header/header";
import { Navigation } from "./components/navigation";
import { Sorting } from "./components/sorting";
import { FilmsSection } from "./components/films-section";
import { Statistic } from "./components/statistic";
import { Footer } from "../../components/footer/footer";
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";
import { useStore } from "../../store";

export const Main: React.FC = observer((): JSX.Element => {
  const {
    appStore: { resetAppState, isStatisticMode },
    movieStore: { loadMovies, isMoviesLoaded, resetMovies },
  } = useStore();

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    return () => {
      resetAppState();
      resetMovies();
    };
  }, [resetAppState, resetMovies]);
  return (
    <>
      <Header />
      <main className="main">
        <Navigation />
        {isStatisticMode ? (
          <Statistic />
        ) : (
          <>
            <Sorting />
            {isMoviesLoaded ? <FilmsSection /> : <LoadingSpinner />}
          </>
        )}
      </main>
      <Footer />
    </>
  );
});
