import axios from 'axios';

export const publicAxios = axios.create({
  baseURL: `http://localhost:4000`,
  timeout: 15_000,
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
        console.log('publicAxios interceptors error:', error);
        return Promise.reject(error)
    }
);
