import React from "react";
import { useMovies } from "../../redux/data/hooks/selectors";
import { useCurrentFilterType } from "../../redux/app/hooks/selectors";
import { useSetFilterType } from "../../redux/app/hooks/useSetFilterType";
import { FilterType } from "../../const";
import { getFilterItemCount } from "../../utils/filter";

const Filter: React.FC = (): JSX.Element => {
  const movies = useMovies();
  const currentFilterType = useCurrentFilterType();
  const setFilterType = useSetFilterType();

  const getMoviesCountByFilter = getFilterItemCount(movies);

  const onFilterItemClickHandler = (filterType: string) => (
    evt: React.MouseEvent,
  ) => {
    evt.preventDefault();
    setFilterType(filterType);
  };

  return (
    <div className="main-navigation__items">
      {Object.values(FilterType).map((filter) => (
        <a
          onClick={onFilterItemClickHandler(filter)}
          href={`#${filter.toLowerCase()}`}
          className={`main-navigation__item ${
            filter === currentFilterType ? `main-navigation__item--active` : ``
          }`}
        >
          {filter === "All" ? "All movies" : filter}
          {filter !== "All" ? (
            <span className="main-navigation__item-count">
              {getMoviesCountByFilter(filter)}
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
