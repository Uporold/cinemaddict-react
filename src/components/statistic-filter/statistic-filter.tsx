import React from "react";
import { TimePeriod } from "../../utils/chart";

interface Props {
  currentStatisticFilter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const StatisticFilter: React.FC<Props> = ({
  currentStatisticFilter,
  setFilter,
}): JSX.Element => {
  const filters = Object.values(TimePeriod);
  const onFilterClickHandler = (filter: string) => () => {
    setFilter(filter);
  };
  return (
    <form
      action="https://echo.htmlacademy.ru/"
      method="get"
      className="statistic__filters"
    >
      <p className="statistic__filters-description">Show stats:</p>
      {filters.map((filter: string) => {
        const filterLowerCase =
          filter.charAt(0).toLowerCase() + filter.replace(` `, `-`).slice(1);
        return (
          <React.Fragment key={filter}>
            <input
              type="radio"
              className="statistic__filters-input visually-hidden"
              name="statistic-filter"
              id={`statistic-${filterLowerCase}`}
              value={`${filterLowerCase}`}
              checked={filter === currentStatisticFilter}
              readOnly
            />
            <label
              htmlFor={`statistic-${filter}`}
              className="statistic__filters-label"
              onClick={onFilterClickHandler(filter)}
            >
              {filter}
            </label>
          </React.Fragment>
        );
      })}
    </form>
  );
};

export default StatisticFilter;
