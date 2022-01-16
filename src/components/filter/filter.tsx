import React from "react";
import { observer } from "mobx-react-lite";
import { FilterType } from "../../const";
import { FilterItem } from "./components/filter-item";
import { useStore } from "../../store";

export const Filter: React.FC = observer((): JSX.Element => {
  const {
    appStore: { currentFilterType, setFilterType, isStatisticMode },
    authStore: { authorizationStatus },
  } = useStore();

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
          isAuth={authorizationStatus}
          currentFilterType={currentFilterType}
          isStatisticOpen={isStatisticMode}
          key={filterType}
        />
      ))}
    </ul>
  );
});
