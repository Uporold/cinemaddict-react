import { useCallback } from "react";
import { Operation } from "../auth";
import { useStoreDispatch } from "../../reducer";

export const useLogout = () => {
  const dispatch = useStoreDispatch();

  return useCallback(() => {
    dispatch(Operation.logout());
  }, [dispatch]);
};
