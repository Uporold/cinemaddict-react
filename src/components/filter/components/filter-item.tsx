import React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { FilterType } from "../../../const";
import { useStore } from "../../../store";

interface Props {
  filterType: string;
  onFilterItemClickHandler: (evt: React.MouseEvent) => void;
  isAuth: boolean;
  currentFilterType: string;
  isStatisticOpen: boolean;
}

export const FilterItem: React.FC<Props> = observer(
  ({
    filterType,
    onFilterItemClickHandler,
    isAuth,
    currentFilterType,
    isStatisticOpen,
  }) => {
    const {
      movieStore: { getMoviesCountByFilter },
    } = useStore();
    const moviesCount = computed(() =>
      getMoviesCountByFilter(filterType),
    ).get();
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
  },
);
