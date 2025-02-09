export type TApiResponseSuccess<T> = {
  data: T;
  message: string;
  statusCode: number;
  error: null;
}

export type TApiResponseReject = {
  data: null;
  message: string;
  statusCode: number;
  error: string;
}

export type TRecipeCard = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

export type TRecipeIngredient = {
  id: number
  name: string
  original?: string
  image?: string
}

export type TRecipeInformation = {
  recipeId: number;
  title: string;
  image: string;
  diets?: [];
  dishTypes?: []
  instructions: string
  readyInMinutes: number
  summary: string
  isFavourite?: boolean
  extendedIngredients: TRecipeIngredient[]
  userId?: number
};

export type TProps = {
  recipe?: TRecipeCard;
}