import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
});

export default axiosClient;
