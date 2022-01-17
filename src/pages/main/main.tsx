import React, { useEffect } from "react";
import { Header } from "../../components/header/header";
import { Navigation } from "./components/navigation";
import { Sorting } from "./components/sorting";
import { FilmsSection } from "./components/films-section";
import { Statistic } from "./components/statistic";
import { Footer } from "../../components/footer/footer";
import { useStatisticStatus } from "../../store/app/hooks/selectors";
import { useLoadMovies } from "../../store/movie/hooks/useLoadMovies";
import { useMoviesLoadingStatus } from "../../store/movie/hooks/selectors";
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";
import { useResetAppState } from "../../store/app/hooks/useResetAppState";
import { useResetMovies } from "../../store/movie/hooks/useResetMovies";

export const Main: React.FC = (): JSX.Element => {
  const isStatOpen = useStatisticStatus();
  const loadMovies = useLoadMovies();
  const isMoviesLoaded = useMoviesLoadingStatus();
  const resetAppState = useResetAppState();
  const resetMovies = useResetMovies();

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
        {isStatOpen ? (
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
};
