import React, { useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import StatisticFilter from "../statistic-filter/statistic-filter";
import StatisticChart from "../statistic-chart/statistic-chart";
import { getFilteredStatisticMovies, TimePeriod } from "../../utils/chart";
import { useMovies } from "../../redux/data/hooks/selectors";
import { getUserRank } from "../header/header";
import { Movie } from "../../types";

dayjs.extend(duration);

const getTotalTime = (movies: Movie[]) => {
  let totalTime = 0;
  movies.forEach((movie) => {
    totalTime += movie.filmInfo.runtime;
  });
  return totalTime;
};

const getAllGenres = (movies: Movie[]) => {
  const genres: string[] = [];
  movies.forEach((movie) => {
    genres.push(...movie.filmInfo.genre);
  });
  return genres;
};

const getTopGenre = (arr: string[]) => {
  return arr
    .slice()
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length,
    )
    .pop();
};

const Statistic: React.FC = (): JSX.Element => {
  const [currentStatisticFilter, setFilter] = useState(TimePeriod.ALL_TIME);
  const movies = useMovies();
  const watchedMovies = getFilteredStatisticMovies(
    movies,
    currentStatisticFilter,
  );
  console.log(watchedMovies);
  const rankByTimePeriod = getUserRank(watchedMovies);
  const genres = getAllGenres(
    getFilteredStatisticMovies(movies, currentStatisticFilter),
  );
  const topGenre = getTopGenre(genres);

  const totalDuration = dayjs
    .duration(getTotalTime(watchedMovies), `minutes`)
    .format(`H[h] mm[m]`);
  return (
    <section className="statistic">
      <p className="statistic__rank">
        Your rank
        <img
          className="statistic__img"
          src="images/bitmap@2x.png"
          alt="Avatar"
          width="35"
          height="35"
        />
        <span className="statistic__rank-label">{rankByTimePeriod}</span>
      </p>
      <StatisticFilter
        currentStatisticFilter={currentStatisticFilter}
        setFilter={setFilter}
      />
      <ul className="statistic__text-list">
        <li className="statistic__text-item">
          <h4 className="statistic__item-title">You watched</h4>
          <p className="statistic__item-text">
            {watchedMovies.length}
            <span className="statistic__item-description">movies</span>
          </p>
        </li>
        <li className="statistic__text-item">
          <h4 className="statistic__item-title">Total duration</h4>
          <p className="statistic__item-text">{totalDuration}</p>
        </li>
        {topGenre ? (
          <li className="statistic__text-item">
            <h4 className="statistic__item-title">Top genre</h4>
            <p className="statistic__item-text">{topGenre}</p>
          </li>
        ) : (
          ``
        )}
      </ul>
      <StatisticChart currentStatisticFilter={currentStatisticFilter} />
    </section>
  );
};

export default Statistic;
