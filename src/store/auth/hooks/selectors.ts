import { useSelector } from "react-redux";
import {
  getAuthorizationStatus,
  getFormErrorMessage,
  getFormErrorStatus,
  getUser,
} from "../selectors";

export const useAuthorizationStatus = (): boolean => {
  return useSelector(getAuthorizationStatus);
};

export const useUser = () => {
  return useSelector(getUser);
};

export const useFormErrorStatus = () => {
  return useSelector(getFormErrorStatus);
};

export const useFormErrorMessage = () => {
  return useSelector(getFormErrorMessage);
};
