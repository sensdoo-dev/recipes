import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { instance } from '../../../shared/lib/axiosInstance';
import type { TApiResponseReject, TApiResponseSuccess, TRecipeCard, TRecipeInformation } from '../../../shared/model';
import { defaultRejectedAxiosError } from '../../../shared/consts';

enum RECIPE_API_ROUTES {
  COMPLEX_SEARCH = 'api/complexSearch',
  RECIPE_INFORMATION = 'api/recipeInformation',
}

type TSearchResponse = {
  number: number
  offset: number
  results: Array<TRecipeCard>
  totalResults: number
}

export default class ApiRecipe {
  static async complexSearch(params: string): Promise<TApiResponseSuccess<TSearchResponse> | TApiResponseReject> {
    try {
      const response = await instance.get<TApiResponseSuccess<TSearchResponse>>(RECIPE_API_ROUTES.COMPLEX_SEARCH + `?query=${params}`)
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

static async getRecipeInfomationById(recipeId: string) {
  try {
    const response = await instance.get<TApiResponseSuccess<TRecipeInformation>>(RECIPE_API_ROUTES.RECIPE_INFORMATION + `/${recipeId}`)    
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
