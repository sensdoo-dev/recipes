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
