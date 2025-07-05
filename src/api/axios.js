
import axios from "axios";
import { BE_URL } from "../config";

export const API = axios.create({
  baseURL: BE_URL,
  timeout: 6000,
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);
