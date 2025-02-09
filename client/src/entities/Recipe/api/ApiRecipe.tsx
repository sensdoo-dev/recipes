import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { instance, recipeAxios } from '../../../shared/lib/axiosInstance';
import type { TApiResponseReject, TApiResponseSuccess } from '../../../shared/model';
import type { TLoginData, TRegistrData, TUserWithToken } from '../model';
import { defaultRejectedAxiosError } from '../../../shared/consts';

enum RECIPE_API_ROUTES {
  COMPLEX_SEARCH = 'api/complexSearch',
  RECIPE_INFORMATION = 'api/information/:recipeId',
}

type TRecipeParams = {
  query: string
}

export default class ApiRecipe {
  static async complexSearch(params: TRecipeParams): Promise<any> {
    try {
      const response = await instance.get<AxiosResponse>(RECIPE_API_ROUTES.COMPLEX_SEARCH + `?query=${params.query}`)
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

static async getRecipeInfomationById(recipeId: number) {
  try {
    const response = await instance.get<AxiosResponse>(RECIPE_API_ROUTES.RECIPE_INFORMATION + `/${recipeId}`)    
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
}
