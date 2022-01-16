import React, { useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { StatisticFilter } from "../../../components/statistic-filter/statistic-filter";
import { StatisticChart } from "../../../components/statistic-chart/statistic-chart";
import {
  getAllGenres,
  getFilteredStatisticMovies,
  getGenresByFrequency,
  getTotalTime,
  TimePeriod,
} from "../../../utils/chart";
import { getUserRank } from "../../../utils/common";
import { useStore } from "../../../store";

dayjs.extend(duration);

export const Statistic: React.FC = (): JSX.Element => {
  const [currentStatisticFilter, setFilter] = useState(TimePeriod.ALL_TIME);
  const {
    movieStore: { movies },
  } = useStore();
  const watchedMovies = getFilteredStatisticMovies(
    movies,
    currentStatisticFilter,
  );
  const rankByTimePeriod = getUserRank(watchedMovies);

  const totalDurationInMs = dayjs.duration(
    getTotalTime(watchedMovies),
    `minutes`,
  );

  const genresByFilter = getAllGenres(
    getFilteredStatisticMovies(movies, currentStatisticFilter),
  );

  const genresByFrequency = getGenresByFrequency(genresByFilter);

  const topGenreByTimePeriod = genresByFilter.length
    ? genresByFrequency[0][0]
    : "";

  const durationInHours =
    totalDurationInMs.days() * 24 + totalDurationInMs.hours();
  const durationInMinutes = totalDurationInMs.minutes();

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
          <p className="statistic__item-text">
            {durationInHours}
            <span className="statistic__item-description">h</span>{" "}
            {durationInMinutes}
            <span className="statistic__item-description">m</span>
          </p>
        </li>
        {topGenreByTimePeriod ? (
          <li className="statistic__text-item">
            <h4 className="statistic__item-title">Top genre</h4>
            <p className="statistic__item-text">{topGenreByTimePeriod}</p>
          </li>
        ) : (
          ``
        )}
      </ul>
      <StatisticChart genresByFrequency={genresByFrequency} />
    </section>
  );
};
