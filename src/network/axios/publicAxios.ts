import axios from 'axios';
import { API_SERVER_URL, NETWORK_TIME_OUT } from "../config/networkConfig"

const publicAxios = axios.create({
  baseURL: API_SERVER_URL,
  timeout: NETWORK_TIME_OUT,
});

publicAxios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

publicAxios.interceptors.response.use(
  res => res,
    async error => {
        console.log('Axios interceptors error:', error);
        return Promise.reject(error)
    }
);

export default publicAxios;