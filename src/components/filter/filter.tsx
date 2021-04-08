import React from "react";
import { useMovies } from "../../redux/data/hooks/selectors";

const Selectors = {
  WATCHLIST: `isInWatchlist`,
  HISTORY: `isInWatched`,
  FAVORITE: `isInFavorite`,
};

const Filter: React.FC = (): JSX.Element => {
  const movies = useMovies();
  const getFilterItemCount = (item: any): number => {
    return movies.filter((movie) => {
      // @ts-ignore
      return movie.userDetails[item];
    }).length;
  };
  return (
    <div className="main-navigation__items">
      <a
        href="#all"
        className="main-navigation__item main-navigation__item--active"
      >
        All movies
      </a>
      <a href="#watchlist" className="main-navigation__item">
        Watchlist
        <span className="main-navigation__item-count">
          {getFilterItemCount(Selectors.WATCHLIST)}
        </span>
      </a>
      <a href="#history" className="main-navigation__item">
        History
        <span className="main-navigation__item-count">
          {getFilterItemCount(Selectors.HISTORY)}
        </span>
      </a>
      <a href="#favorites" className="main-navigation__item">
        Favorites
        <span className="main-navigation__item-count">
          {getFilterItemCount(Selectors.FAVORITE)}
        </span>
      </a>
    </div>
  );
};

export default Filter;
