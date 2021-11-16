import React from "react";
import { useSetStatisticMode } from "../../store/app/hooks/useSetStatisticMode";
import { useStatisticStatus } from "../../store/app/hooks/selectors";
import { useAuthorizationStatus } from "../../store/auth/hooks/selectors";

const disableStyle = {
  pointerEvents: "none",
  color: "var(--text-color-disabled)",
};

export const StatsLink: React.FC = (): JSX.Element => {
  const openStatistic = useSetStatisticMode();
  const isStatisticOpen = useStatisticStatus();
  const isAuth = useAuthorizationStatus();
  const style = !isAuth ? disableStyle : {};
  return (
    <a
      href="#stats"
      style={style}
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
