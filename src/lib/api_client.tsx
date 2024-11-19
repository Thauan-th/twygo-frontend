import axios from "axios";
// import { cookiesKeys } from "@/constants/storage";
import { parseCookies } from "nookies";

const getAuthToken = () => {
  const cookies = parseCookies();
  return cookies["tw_auth_token"];
};

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    // Already concatenated with "Bearer"
    config.headers.Authorization = token;
  }

  return config;
});

export default apiClient;
