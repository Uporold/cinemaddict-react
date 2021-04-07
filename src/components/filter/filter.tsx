import React from "react";

const Filter: React.FC = (): JSX.Element => {
  return (
    <div className="main-navigation__items">
      <a
        href="#all"
        className="main-navigation__item main-navigation__item--active"
      >
        All movies
      </a>
      <a href="#watchlist" className="main-navigation__item">
        Watchlist <span className="main-navigation__item-count">0</span>
      </a>
      <a href="#history" className="main-navigation__item">
        History <span className="main-navigation__item-count">0</span>
      </a>
      <a href="#favorites" className="main-navigation__item">
        Favorites <span className="main-navigation__item-count">0</span>
      </a>
    </div>
  );
};

export default Filter;
