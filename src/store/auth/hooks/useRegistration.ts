import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { RegistrationData } from "../../../types";

export const useRegistration = (): ((authData: RegistrationData) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (authData) => {
      dispatch.auth.register(authData);
    },
    [dispatch],
  );
};
