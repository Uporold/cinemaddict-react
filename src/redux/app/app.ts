import { InferActionsTypes } from "../reducer";
import { FilterType } from "../../const";

export const initialState = {
  currentFilterType: FilterType.ALL as string,
};

type InitialStateType = typeof initialState;
type AppActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;

const ActionType = {
  SET_FILTER_TYPE: `SET_FILTER_TYPE`,
} as const;

export const ActionCreator = {
  setFilterType: (filterType: string) => {
    return {
      type: ActionType.SET_FILTER_TYPE,
      payload: filterType,
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
    default:
      return state;
  }
};
