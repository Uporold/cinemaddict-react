import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../auth";
import { AuthData } from "../../../types";

export const useLogin = (): ((authData: AuthData) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (authData) => {
      dispatch(Operation.login(authData));
    },
    [dispatch],
  );
};
