/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'

export type HttpErrorResponseType = {
  status?: boolean
  error?: AxiosError | AnyObject | string | any
}

export const HttpError = (errorObject: HttpErrorResponseType) => {
  if (errorObject?.error && errorObject.error instanceof Object) {
    const errors = errorObject?.error?.response?.data as AnyObject
    return { error: errors, status: false }
  }
  return { error: errorObject?.error || true, status: false }
}
