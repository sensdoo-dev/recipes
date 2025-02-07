import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { instance } from '../../../shared/lib/axiosInstance';
import type { TApiResponseReject, TApiResponseSuccess } from '../../../shared/model';
import type { TLoginData, TRegistrData, TUserWithToken } from '../model';
import { defaultRejectedAxiosError } from '../../../shared/consts';

enum AUTH_API_ROUTES {
  REFRESH_TOKENS = '/auth/refreshTokens',
  REGISTR = '/auth/reg',
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
}

export default class ApiUser {
  static async refreshTokens(): Promise<TApiResponseSuccess<TUserWithToken> | TApiResponseReject> {
    try {
      const response = await instance.get<AxiosResponse<TApiResponseSuccess<TUserWithToken>>>(AUTH_API_ROUTES.REFRESH_TOKENS)
      return response.data
    } catch (error: unknown) {  
      if (error instanceof AxiosError) {
        if (!error.response) {
          return defaultRejectedAxiosError as TApiResponseReject;
        }
        return error.response.data as TApiResponseReject;
      }
  
      return defaultRejectedAxiosError;
    }
  }

  static async reg(registrData: TRegistrData): Promise<TApiResponseSuccess<TUserWithToken> | TApiResponseReject> {
    try {
      const result = await instance.post<AxiosResponse<TApiResponseSuccess<TUserWithToken>>>(AUTH_API_ROUTES.REGISTR, registrData);
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
      console.log(1);
      
      const result = await instance.post<AxiosResponse<TApiResponseSuccess<TUserWithToken>>>(AUTH_API_ROUTES.LOGIN, loginData);
      console.log(2);
      
      return result.data;
    } catch (error) {
      console.log(4);
      
      const axiosError = error as AxiosError<TApiResponseReject>
      if (!axiosError.response) {
        return defaultRejectedAxiosError as TApiResponseReject
      }
      return axiosError.response.data
    }
  }

  static async logout(): Promise<TApiResponseSuccess<null>| TApiResponseReject> {
    try {
      const result = await instance.get<AxiosResponse<TApiResponseSuccess<null>>>(AUTH_API_ROUTES.LOGOUT);
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
