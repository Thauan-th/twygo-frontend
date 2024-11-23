import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

export default apiClient;
