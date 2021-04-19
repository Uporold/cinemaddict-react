import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { usePrevious } from "../../utils/common";
import { BAR_HEIGHT, setData, setOptions } from "../../utils/chart";

interface Props {
  genresByFrequency: [string, number][];
}

const StatisticChart: React.FC<Props> = ({
  genresByFrequency,
}): JSX.Element => {
  const prevGenresLength = usePrevious(genresByFrequency.length);

  const getChartData = () => {
    return setData(genresByFrequency);
  };

  const getChartHeight = () => {
    return genresByFrequency.length * BAR_HEIGHT;
  };

  return (
    <div className="statistic__chart-wrap">
      <HorizontalBar
        width={1000}
        height={getChartHeight()}
        data={getChartData()}
        options={setOptions()}
        redraw={prevGenresLength !== genresByFrequency.length}
      />
    </div>
  );
};

export default StatisticChart;
