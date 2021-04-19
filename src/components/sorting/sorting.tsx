import React from "react";
import { SortType } from "../../const";
import { useCurrentSortType } from "../../redux/app/hooks/selectors";
import { useSetSortType } from "../../redux/app/hooks/useSetSortType";

const Sorting: React.FC = (): JSX.Element => {
  const currentSortType = useCurrentSortType();
  const setSortType = useSetSortType();

  const onFilterItemClickHandler = (sortType: string) => (
    evt: React.MouseEvent,
  ) => {
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
};

export default Sorting;
