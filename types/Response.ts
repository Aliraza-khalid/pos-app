export type APIResponse<T> = APIResponseSuccess<T> | APIResponseError;

export type APIResponseError = {
  success: false,
  message: string,
}

export type APIResponseSuccess<T> = {
  success: true,
  result: T
}