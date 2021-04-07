import React from "react";
import Filter from "../filter/filter";
import StatsLink from "../stats-link/stats-link";

const Navigation: React.FC = (): JSX.Element => {
  return (
    <nav className="main-navigation">
      <Filter />
      <StatsLink />
    </nav>
  );
};

export default Navigation;
