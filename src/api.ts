import axios, { AxiosInstance } from "axios";

export const API_URL = `http://localhost:4000/`;

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

  return api;
};
