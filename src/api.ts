import axios, { AxiosInstance } from "axios";

const token = `ddfdeer2123123113`;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: `https://11.ecmascript.pages.academy/cinemaddict/`,
    timeout: 1000 * 5,
    withCredentials: false,
    headers: {
      authorization: `Basic ${token}`,
    },
  });

  return api;
};
