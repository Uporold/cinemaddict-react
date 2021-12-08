import { createSlice } from "@reduxjs/toolkit";
import { FilterType, SortType } from "../../const";

export const initialState = {
  currentFilterType: FilterType.ALL as string,
  currentSortType: SortType.DEFAULT as string,
  isStatisticMode: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SET_FILTER_TYPE(state, action) {
      state.currentFilterType = action.payload;
      state.isStatisticMode = false;
    },
    SET_SORT_TYPE(state, action) {
      state.currentSortType = action.payload;
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

export const {
  SET_FILTER_TYPE,
  SET_SORT_TYPE,
  OPEN_STATISTIC,
  RESET_APP_STATE,
} = appSlice.actions;

export default appSlice.reducer;
