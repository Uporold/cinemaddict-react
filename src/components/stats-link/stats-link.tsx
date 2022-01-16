import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

const disableStyle = {
  pointerEvents: "none",
  color: "var(--text-color-disabled)",
};

export const StatsLink: React.FC = observer((): JSX.Element => {
  const {
    appStore: { isStatisticMode, openStatistic },
    authStore: { authorizationStatus },
  } = useStore();
  const style = !authorizationStatus ? disableStyle : {};
  return (
    <span
      style={style}
      className={`main-navigation__additional ${
        isStatisticMode ? `main-navigation__item--active` : ``
      }`}
      onClick={openStatistic}
    >
      Stats
    </span>
  );
});
