import React from "react";
import { observer } from "mobx-react-lite";
import { SortType } from "../../../const";
import { useStore } from "../../../store";

export const Sorting: React.FC = observer((): JSX.Element => {
  const {
    appStore: { currentSortType, setSortType },
  } = useStore();

  const onFilterItemClickHandler =
    (sortType: string) => (evt: React.MouseEvent) => {
      evt.preventDefault();
      setSortType(sortType);
    };
  return (
    <ul className="sort">
      {Object.values(SortType).map((sortType) => (
        <li key={sortType}>
          <a
            href={`#${sortType}`}
            onClick={onFilterItemClickHandler(sortType)}
            className={`sort__button ${
              sortType === currentSortType ? `sort__button--active` : ``
            }`}
          >
            Sort by {sortType}
          </a>
        </li>
      ))}
    </ul>
  );
});
