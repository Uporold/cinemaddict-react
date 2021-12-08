import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { AuthData } from "../../../types";

export const useLogin = (): ((authData: AuthData) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (authData) => {
      dispatch.auth.login(authData);
    },
    [dispatch],
  );
};
