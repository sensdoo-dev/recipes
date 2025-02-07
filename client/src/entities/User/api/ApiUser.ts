import type { AxiosError } from 'axios';
import { axiosInstance } from '../../../shared/lib/axiosInstance';
import type { TApiResponseReject, TApiResponseSuccess } from '../../../shared/lib/model';
import type { TLoginData, TRegistrData, TUserWithToken } from '../model';
import { defaultRejectedAxiosError } from '../../../shared/lib/consts';

enum AUTH_API_ROUTES {
  REFRESH_TOKENS = '/auth/refreshTokens',
  REGISTR = '/auth/reg',
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
}

export default class ApiUser {
  static async refreshTokens(): Promise<TApiResponseSuccess<TUserWithToken> | TApiResponseReject> {
    try {
      const result = await axiosInstance.get<TApiResponseSuccess<TUserWithToken>>(AUTH_API_ROUTES.REFRESH_TOKENS);
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError<TApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as TApiResponseReject;
      }
      return axiosError.response.data;
    }
  }

  static async reg(registrData: TRegistrData): Promise<TApiResponseSuccess<TUserWithToken>| TApiResponseReject> {
    try {
      const result = await axiosInstance.post<TApiResponseSuccess<TUserWithToken>>(AUTH_API_ROUTES.REGISTR, registrData);
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError<TApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as TApiResponseReject;
      }
      return axiosError.response.data;
    }
  }

  static async login(loginData: TLoginData): Promise<TApiResponseSuccess<TUserWithToken>| TApiResponseReject> {
    try {
      const result = await axiosInstance.post(AUTH_API_ROUTES.LOGIN, loginData);
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError<TApiResponseReject>
      if (!axiosError.response) {
        return defaultRejectedAxiosError as TApiResponseReject
      }
      return axiosError.response.data
    }
  }

  static async logout(): Promise<TApiResponseSuccess<null>| TApiResponseReject> {
    try {
      const result = await axiosInstance.get(AUTH_API_ROUTES.LOGOUT);
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError<TApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as TApiResponseReject;
      }
      return axiosError.response.data;
    }
  }
}
