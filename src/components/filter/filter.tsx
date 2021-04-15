import React from "react";
import { useMovies } from "../../redux/data/hooks/selectors";
import {
  useCurrentFilterType,
  useStatisticStatus,
} from "../../redux/app/hooks/selectors";
import { useSetFilterType } from "../../redux/app/hooks/useSetFilterType";
import { FilterType } from "../../const";
import { getFilterItemCount } from "../../utils/filter";
import { useSetStatisticMode } from "../../redux/app/hooks/useSetStatisticMode";

const Filter: React.FC = (): JSX.Element => {
  const movies = useMovies();
  const currentFilterType = useCurrentFilterType();
  const setFilterType = useSetFilterType();

  const isStatisticOpen = useStatisticStatus();
  const closeStatistic = useSetStatisticMode();

  const getMoviesCountByFilter = getFilterItemCount(movies);

  const onFilterItemClickHandler = (filterType: string) => (
    evt: React.MouseEvent,
  ) => {
    evt.preventDefault();
    setFilterType(filterType);
    closeStatistic(false);
  };

  return (
    <div className="main-navigation__items">
      {Object.values(FilterType).map((filterType) => (
        <a
          onClick={onFilterItemClickHandler(filterType)}
          href={`#${filterType.toLowerCase()}`}
          className={`main-navigation__item ${
            filterType === currentFilterType && !isStatisticOpen
              ? `main-navigation__item--active`
              : ``
          } ${
            getMoviesCountByFilter(filterType) === 0
              ? `main-navigation__item--disabled`
              : ``
          }`}
        >
          {filterType === FilterType.ALL ? "All movies" : filterType}
          {filterType !== FilterType.ALL ? (
            <span className="main-navigation__item-count">
              {getMoviesCountByFilter(filterType)}
            </span>
          ) : (
            ""
          )}
        </a>
      ))}
    </div>
  );
};

export default Filter;
