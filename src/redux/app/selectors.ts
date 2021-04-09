import { GlobalState } from "../reducer";

export const getFilterType = (state: GlobalState): string =>
  state.APP.currentFilterType;

export const getSortType = (state: GlobalState): string =>
  state.APP.currentSortType;
