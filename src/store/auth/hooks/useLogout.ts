import { useDispatch } from "react-redux";
import { Operation } from "../auth";

export const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(Operation.logout());
  };
};
