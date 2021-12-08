import { useCallback } from "react";
import { useStoreDispatch } from "../../reducer";
import { Operation } from "../auth";
import { RegistrationData } from "../../../types";

export const useRegistration = (): ((authData: RegistrationData) => void) => {
  const dispatch = useStoreDispatch();

  return useCallback(
    (authData) => {
      dispatch(Operation.register(authData));
    },
    [dispatch],
  );
};
