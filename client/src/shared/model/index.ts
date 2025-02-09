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

export type TProps = {
  recipe?: TRecipeCard;
}