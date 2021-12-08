import { GlobalState } from "../reducer";

export const getFilterType = (state: GlobalState): string =>
  state.app.currentFilterType;

export const getSortType = (state: GlobalState): string =>
  state.app.currentSortType;

export const getStatisticStatus = (state: GlobalState): boolean =>
  state.app.isStatisticMode;
