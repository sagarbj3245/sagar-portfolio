// AD-3: the one API response envelope every endpoint returns.
// AD-12: defined once here, consumed by both frontend and backend.

/** A successful API response. */
export type ApiSuccess<T> = { data: T };

/** A failed API response. */
export type ApiError = { error: { message: string; code: string } };

/** Any API response is either a success envelope or an error envelope. */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/** Wrap a value in the success envelope. */
export const ok = <T>(data: T): ApiSuccess<T> => ({ data });

/** Build an error envelope. */
export const fail = (message: string, code: string): ApiError => ({
  error: { message, code },
});
