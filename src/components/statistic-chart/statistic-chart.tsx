import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Movie } from "../../types";
import { ensure } from "../../utils/common";
import { useMovies } from "../../redux/data/hooks/selectors";
import {
  BAR_HEIGHT,
  getFilteredStatisticMovies,
  setData,
  setOptions,
} from "../../utils/chart";

const getAllGenres = (movies: Movie[]) => {
  const genres: string[] = [];
  movies.forEach((movie) => {
    genres.push(...movie.filmInfo.genre);
  });
  return genres;
};

interface Props {
  currentStatisticFilter: string;
}

const StatisticChart: React.FC<Props> = ({
  currentStatisticFilter,
}): JSX.Element => {
  const movies = useMovies();
  const getData = (cb: ((genre: string) => number) | (() => boolean)) => {
    const reducer = (sum: Map<string, number>, genre: string) => {
      if (!sum.has(genre)) {
        sum.set(genre, 0);
      }
      sum.set(genre, ensure(sum.get(genre)) + (cb(genre) as number));

      return sum;
    };
    const genres = getAllGenres(
      getFilteredStatisticMovies(movies, currentStatisticFilter),
    );
    return Array.from(genres.reduce(reducer, new Map())).sort((a, b) => {
      return b[1] - a[1];
    });
  };

  const getGenresTotal = (): [string, number][] => {
    return getData(() => {
      return true;
    });
  };

  const getChartData = (cb: () => [string, number][]) => {
    const data = cb();
    return setData(data);
  };

  const getChartHeight = (cb: () => [string, number][]) => {
    return cb().length === 0 ? 0 : 450;
  };

  console.log(getChartData(getGenresTotal));

  return (
    <div className="statistic__chart-wrap">
      <HorizontalBar
        width={1000}
        height={getChartHeight(getGenresTotal)}
        data={getChartData(getGenresTotal)}
        options={setOptions()}
      />
    </div>
  );
};

export default StatisticChart;
