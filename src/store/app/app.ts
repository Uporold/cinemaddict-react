import { createModel } from "@rematch/core";
import { FilterType, SortType } from "../../const";
import { RootModel } from "../reducer";

export const initialState = {
  currentFilterType: FilterType.ALL as string,
  currentSortType: SortType.DEFAULT as string,
  isStatisticMode: false,
};

export const app = createModel<RootModel>()({
  state: initialState,
  reducers: {
    SET_FILTER_TYPE(state, payload) {
      state.currentFilterType = payload;
      state.isStatisticMode = false;
    },
    SET_SORT_TYPE(state, payload) {
      state.currentSortType = payload;
    },
    OPEN_STATISTIC(state) {
      state.isStatisticMode = true;
      state.currentSortType = SortType.DEFAULT;
    },
    RESET_APP_STATE() {
      return initialState;
    },
  },
});
