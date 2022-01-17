import { useCallback } from "react";
import { Operation } from "../auth";
import { AuthData } from "../../../types";
import { useStoreDispatch } from "../../reducer";

export const useLogin = (): ((authData: AuthData) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (authData) => {
      dispatch(Operation.login(authData));
    },
    [dispatch],
  );
};
