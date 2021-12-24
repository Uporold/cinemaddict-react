import { RootState } from "../reducer";

export const getFilterType = (state: RootState): string =>
  state.app.currentFilterType;

export const getSortType = (state: RootState): string =>
  state.app.currentSortType;

export const getStatisticStatus = (state: RootState): boolean =>
  state.app.isStatisticMode;
