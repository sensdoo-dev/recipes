import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

type ExtendedAxiosRequestConfig = InternalAxiosRequestConfig & {
  sent?: boolean;
} 

// TODO - создаем экземпляр axios
export const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, 
});

//* переменная для хранения кратковременного токена
let accessToken = '';

//* функция для перезаписи кратковременного токена
export function setAccessToken(token: string): void {
  accessToken = token;
}

//* Перехватчик запросов: в каждый запрос добавляет HTTP заголовок Authorization, значением заголовка будет кратковременный токен
instance.interceptors.request.use((config: ExtendedAxiosRequestConfig) => {
  if (!config.headers.authorization) {    
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//* Перехватчик ответов:
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // ? запомнили информацию о прошлом запросе
    const prevRequest: ExtendedAxiosRequestConfig | undefined = error.config;
    // ?  проверяем статус и проверка на первичность запроса, если попали внутрь, значит токен протух и нам нужна новая пара    
    if (error.response && error.response.status === 403 && prevRequest && !prevRequest.sent) {
      // ? делаем запрос на пару токенов
      const { data: response } = await instance.get('/auth/refreshTokens');

      // ? достаем токен из ответа
      setAccessToken(response.data.accessToken);

      // ? и создаем новый ключ и sent для проверки первичности
      prevRequest.sent = true;
      // ? устанавливаем заголовки
      prevRequest.headers.authorization = `Bearer ${accessToken}`;
      // ? делаем повторный запрос
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
