import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../auth";
import { AuthData } from "../../../types";

export const useLogin = (): ((authData: AuthData) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (authData) => {
      dispatch(Operation.login(authData));
    },
    [dispatch],
  );
};
