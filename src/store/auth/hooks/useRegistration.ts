import { useCallback } from "react";
import { Operation } from "../auth";
import { RegistrationData } from "../../../types";
import { useStoreDispatch } from "../../reducer";

export const useRegistration = (): ((authData: RegistrationData) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (authData) => {
      dispatch(Operation.register(authData));
    },
    [dispatch],
  );
};
