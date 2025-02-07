import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

type ExtendedAxiosRequestConfig = {
  sent?: boolean;
}

// TODO - создаем экземпляр axios
export const axiosInstance: AxiosInstance = axios.create({
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
axiosInstance.interceptors.request.use((config: ExtendedAxiosRequestConfig) => {
  if (!config.headers.authorization) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//* Перехватчик ответов:
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // ? запомнили информацию о прошлом запросе
    const prevRequest: ExtendedAxiosRequestConfig | undefined = error.config;
    // ?  проверяем статус и проверка на первичность запроса, если попали внутрь, значит токен протух и нам нужна новая пара

    if (error.response.status === 403 && prevRequest && !prevRequest.sent) {
      // ? делаем запрос на пару токенов
      const { data: response } = await axiosInstance.get('/auth/refreshTokens');

      // ? достаем токен из ответа
      setAccessToken(response.data.accessToken);

      // ? и создаем новый ключ и sent для проверки первичности
      prevRequest.sent = true;
      // ? устанавливаем заголовки
      prevRequest.headers.authorization = `Bearer ${accessToken}`;
      // ? делаем повторный запрос
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);
