import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
require('dotenv').config();

type ExtendedAxiosRequestConfig = InternalAxiosRequestConfig & {
  sent?: boolean;
} 

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.API_RECIPES,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, 
});

let accessToken = '';

export function setAccessToken(token: string): void {
  accessToken = token;
}

instance.interceptors.request.use((config: ExtendedAxiosRequestConfig) => {
  if (!config.headers.authorization) {    
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    
    const prevRequest: ExtendedAxiosRequestConfig | undefined = error.config;
       
    if (error.response && error.response.status === 403 && prevRequest && !prevRequest.sent) {
      
      const { data: response } = await instance.get('/auth/refreshTokens');

      setAccessToken(response.data.accessToken);

      prevRequest.sent = true;
      
      prevRequest.headers.authorization = `Bearer ${accessToken}`;
      
      return instance(prevRequest);
    }
    return Promise.reject(error);
  },
);


type Instance = {
  get: <T>(
    arg1: Parameters<typeof instance.get<T>>[0],
    arg2?: Parameters<typeof instance.get<T>>[1]
  ) => Promise<T>;
  post: <T>(
    arg1: Parameters<typeof instance.post<T>>[0],
    arg2?: Parameters<typeof instance.post<T>>[1],
    arg3?: Parameters<typeof instance.post<T>>[2]
  ) => Promise<T>;
  put: <T>(
    arg1: Parameters<typeof instance.put<T>>[0],
    arg2?: Parameters<typeof instance.put<T>>[1],
    arg3?: Parameters<typeof instance.post<T>>[2]
  ) => Promise<T>;
  delete: <T>(
    arg1: Parameters<typeof instance.delete<T>>[0],
    arg2?: Parameters<typeof instance.delete<T>>[1]
  ) => Promise<T>;
};

export const axiosInstance: Instance = {
  get: (...args) => axiosInstance.get(...args),
  post: (...args) => axiosInstance.post(...args),
  put: (...args) => axiosInstance.put(...args),
  delete: (...args) => axiosInstance.delete(...args),
};
