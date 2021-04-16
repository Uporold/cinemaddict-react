import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { ensure, usePrevious } from "../../utils/common";
import { useMovies } from "../../redux/data/hooks/selectors";
import {
  BAR_HEIGHT,
  getAllGenres,
  getFilteredStatisticMovies,
  setData,
  setOptions,
} from "../../utils/chart";

interface Props {
  currentStatisticFilter: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
}

const StatisticChart: React.FC<Props> = ({
  currentStatisticFilter,
  setGenre,
}): JSX.Element => {
  const movies = useMovies();
  const prevFilter = usePrevious(currentStatisticFilter);

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
    const data = getData(() => {
      return true;
    });

    if (data.length) setGenre(data[0][0]);
    if (!data.length) setGenre("");

    return data;
  };

  const getChartData = (cb: () => [string, number][]) => {
    const data = cb();
    return setData(data);
  };

  const getChartHeight = (cb: () => [string, number][]) => {
    return cb().length * BAR_HEIGHT;
  };

  return (
    <div className="statistic__chart-wrap">
      <HorizontalBar
        width={1000}
        height={getChartHeight(getGenresTotal)}
        data={getChartData(getGenresTotal)}
        options={setOptions()}
        redraw={currentStatisticFilter !== prevFilter}
      />
    </div>
  );
};

export default StatisticChart;
