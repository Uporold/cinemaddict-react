import React from "react";
import { useMovies } from "../../store/movie/hooks/selectors";
import {
  useCurrentFilterType,
  useStatisticStatus,
} from "../../store/app/hooks/selectors";
import { useSetFilterType } from "../../store/app/hooks/useSetFilterType";
import { FilterType } from "../../const";
import { getFilterItemCount } from "../../utils/filter";
import { useAuthorizationStatus } from "../../store/auth/hooks/selectors";

export const Filter: React.FC = (): JSX.Element => {
  const movies = useMovies();
  const currentFilterType = useCurrentFilterType();
  const setFilterType = useSetFilterType();

  const isAuth = useAuthorizationStatus();

  const isStatisticOpen = useStatisticStatus();

  const getMoviesCountByFilter = getFilterItemCount(movies);

  const onFilterItemClickHandler = (filterType: string) => (
    evt: React.MouseEvent,
  ) => {
    evt.preventDefault();
    setFilterType(filterType);
  };

  return (
    <div className="main-navigation__items">
      {Object.values(FilterType).map((filterType) => (
        <a
          onClick={onFilterItemClickHandler(filterType)}
          href={`#${filterType.toLowerCase()}`}
          key={filterType}
          className={`main-navigation__item ${
            filterType === currentFilterType && !isStatisticOpen
              ? `main-navigation__item--active`
              : ``
          } ${
            getMoviesCountByFilter(filterType) === 0 ||
            (!isAuth && filterType !== FilterType.ALL)
              ? `main-navigation__item--disabled`
              : ``
          }`}
        >
          {filterType === FilterType.ALL ? "All movies" : filterType}
          {filterType !== FilterType.ALL ? (
            <span className="main-navigation__item-count">
              {isAuth ? getMoviesCountByFilter(filterType) : 0}
            </span>
          ) : (
            ""
          )}
        </a>
      ))}
    </div>
  );
};
