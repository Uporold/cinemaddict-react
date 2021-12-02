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
    setFilterType(state, action) {
      state.currentFilterType = action.payload;
      state.isStatisticMode = false;
    },
    setSortType(state, action) {
      state.currentSortType = action.payload;
    },
    openStatistic(state) {
      state.isStatisticMode = true;
      state.currentSortType = SortType.DEFAULT;
    },
    resetAppState() {
      return initialState;
    },
  },
});

export const { setFilterType, setSortType, openStatistic, resetAppState } =
  appSlice.actions;

export default appSlice.reducer;
