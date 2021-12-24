import React from "react";
import { FilterType } from "../../../const";
import { useMoviesCountByFilter } from "../../../store/movie/hooks/selectors";

interface Props {
  filterType: string;
  onFilterItemClickHandler: (evt: React.MouseEvent) => void;
  isAuth: boolean;
  currentFilterType: string;
  isStatisticOpen: boolean;
}

export const FilterItem: React.FC<Props> = ({
  filterType,
  onFilterItemClickHandler,
  isAuth,
  currentFilterType,
  isStatisticOpen,
}) => {
  const moviesCount = useMoviesCountByFilter(filterType);
  return (
    <li
      onClick={onFilterItemClickHandler}
      key={filterType}
      className={`main-navigation__item ${
        filterType === currentFilterType && !isStatisticOpen
          ? `main-navigation__item--active`
          : ``
      } ${
        moviesCount === 0 || (!isAuth && filterType !== FilterType.ALL)
          ? `main-navigation__item--disabled`
          : ``
      }`}
    >
      {filterType}
      {filterType !== FilterType.ALL ? (
        <span className="main-navigation__item-count">
          {isAuth ? moviesCount : 0}
        </span>
      ) : (
        ""
      )}
    </li>
  );
};
