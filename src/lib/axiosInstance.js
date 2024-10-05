import axios from "axios";
import { useLoading } from "./context/LoadingContext";

export const useAxios = () => {
  const { handleLoading } = useLoading();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000, // 15 seconds
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor to show loading screen
  axiosInstance.interceptors.request.use(
    (config) => {
      handleLoading(true);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to hide loading screen
  axiosInstance.interceptors.response.use(
    (response) => {
      handleLoading(false);
      return response;
    },
    (error) => {
      handleLoading(false);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
