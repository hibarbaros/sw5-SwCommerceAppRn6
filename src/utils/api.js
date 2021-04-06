import axios from 'axios';
import vars from './vars';
import base64 from 'base-64';

export const host = vars.host + '/api';

let axiosInstance = axios.create({
  baseURL: host,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common.Authorization = `Basic ${base64.encode(
  `${vars.username}:${vars.password}`,
)}`;

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
