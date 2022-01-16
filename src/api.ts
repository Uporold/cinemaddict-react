import axios, { AxiosInstance } from "axios";
import history from "./history";
import { RootStore } from "./store/root-store";

export const API_URL = `http://localhost:4000/`;

let store: RootStore;

export const injectStore = (_store: RootStore) => {
  store = _store;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: 1000 * 5,
  });

  api.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const { token } = JSON.parse(user);
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error?.response?.status;
      if (status === 404) {
        history.push("/error");
      }
      if (status === 401) {
        store.authStore.logout();
      }

      return Promise.reject(error?.response ?? error);
    },
  );

  return api;
};
