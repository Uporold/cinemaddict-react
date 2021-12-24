import React from "react";
import {
  useCurrentFilterType,
  useStatisticStatus,
} from "../../store/app/hooks/selectors";
import { useSetFilterType } from "../../store/app/hooks/useSetFilterType";
import { FilterType } from "../../const";
import { useAuthorizationStatus } from "../../store/auth/hooks/selectors";
import { FilterItem } from "./components/filter-item";

export const Filter: React.FC = (): JSX.Element => {
  const currentFilterType = useCurrentFilterType();
  const setFilterType = useSetFilterType();

  const isAuth = useAuthorizationStatus();

  const isStatisticOpen = useStatisticStatus();

  const onFilterItemClickHandler =
    (filterType: string) => (evt: React.MouseEvent) => {
      evt.preventDefault();
      setFilterType(filterType);
    };

  return (
    <ul className="main-navigation__items">
      {Object.values(FilterType).map((filterType) => (
        <FilterItem
          filterType={filterType}
          onFilterItemClickHandler={onFilterItemClickHandler(filterType)}
          isAuth={isAuth}
          currentFilterType={currentFilterType}
          isStatisticOpen={isStatisticOpen}
          key={filterType}
        />
      ))}
    </ul>
  );
};
