import { useStoreDispatch } from "../../reducer";

export const useLogout = () => {
  const dispatch = useStoreDispatch();

  return () => {
    dispatch.auth.logout();
  };
};
