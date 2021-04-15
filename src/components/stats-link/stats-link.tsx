import React from "react";
import { useSetStatisticMode } from "../../redux/app/hooks/useSetStatisticMode";
import { useStatisticStatus } from "../../redux/app/hooks/selectors";

const StatsLink: React.FC = (): JSX.Element => {
  const openStatistic = useSetStatisticMode();
  const isStatisticOpen = useStatisticStatus();
  return (
    <a
      href="#stats"
      className={`main-navigation__additional  ${
        isStatisticOpen ? `main-navigation__item--active` : ``
      }`}
      onClick={() => {
        openStatistic(true);
      }}
    >
      Stats
    </a>
  );
};

export default StatsLink;
