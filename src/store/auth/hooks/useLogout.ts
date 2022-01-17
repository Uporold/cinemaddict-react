import { Operation } from "../auth";
import { useStoreDispatch } from "../../reducer";

export const useLogout = () => {
  const dispatch = useStoreDispatch();

  return () => {
    dispatch(Operation.logout());
  };
};
