import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Operation } from "../auth";
import { RegistrationData } from "../../../types";

export const useRegistration = (): ((authData: RegistrationData) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (authData) => {
      dispatch(Operation.register(authData));
    },
    [dispatch],
  );
};
