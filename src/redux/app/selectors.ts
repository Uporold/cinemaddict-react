import { GlobalState } from "../reducer";

export const getFilterType = (state: GlobalState): string =>
  state.APP.currentFilterType;

export const getSortType = (state: GlobalState): string =>
  state.APP.currentSortType;

export const getStatisticStatus = (state: GlobalState): boolean =>
  state.APP.isStatisticMode;

export const getFormBlockedStatus = (state: GlobalState) =>
  state.APP.isFormBlocked;

export const getFormErrorStatus = (state: GlobalState) => state.APP.isFormError;
