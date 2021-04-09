import { GlobalState } from "../reducer";

export const getFilterType = (state: GlobalState) =>
  state.APP.currentFilterType;
