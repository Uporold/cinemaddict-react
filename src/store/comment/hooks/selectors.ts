import { useSelector } from "react-redux";
import {
  getFormBlockedStatus,
  getFormErrorStatus,
  getMovieComments,
} from "../selectors";
import { Comment } from "../../../types";

export const useFormBlockedStatus = (): boolean => {
  return useSelector(getFormBlockedStatus);
};

export const useFormErrorStatus = (): boolean => {
  return useSelector(getFormErrorStatus);
};

export const useMovieComments = (): Comment[] => useSelector(getMovieComments);
