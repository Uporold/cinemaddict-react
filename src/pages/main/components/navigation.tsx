import React from "react";
import { Filter } from "../../../components/filter/filter";
import { StatsLink } from "../../../components/stats-link/stats-link";

export const Navigation: React.FC = (): JSX.Element => {
  return (
    <nav className="main-navigation">
      <Filter />
      <StatsLink />
    </nav>
  );
};
