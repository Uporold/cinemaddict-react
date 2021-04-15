import { InferActionsTypes } from "../reducer";
import { FilterType, SortType } from "../../const";

export const initialState = {
  currentFilterType: FilterType.ALL as string,
  currentSortType: SortType.DEFAULT as string,
  isStatisticMode: false,
};

type InitialStateType = typeof initialState;
type AppActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;

const ActionType = {
  SET_FILTER_TYPE: `SET_FILTER_TYPE`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_STATISTIC_MODE: `SET_STATISTIC_MODE`,
} as const;

export const ActionCreator = {
  setFilterType: (filterType: string) => {
    return {
      type: ActionType.SET_FILTER_TYPE,
      payload: filterType,
    };
  },

  setSortType: (sortType: string) => {
    return {
      type: ActionType.SET_SORT_TYPE,
      payload: sortType,
    };
  },

  setStatisticsMode: (status: boolean) => {
    return {
      type: ActionType.SET_STATISTIC_MODE,
      payload: status,
    };
  },
};

export const reducer = (
  state = initialState,
  action: AppActionTypes,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_FILTER_TYPE:
      return { ...state, currentFilterType: action.payload };
    case ActionType.SET_SORT_TYPE:
      return { ...state, currentSortType: action.payload };
    case ActionType.SET_STATISTIC_MODE:
      return { ...state, isStatisticMode: action.payload };
    default:
      return state;
  }
};
