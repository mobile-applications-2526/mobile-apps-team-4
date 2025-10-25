import { ApiError } from "@/types";

const isApiError = (error: unknown): error is ApiError => {
  return (
    !!error 
    && typeof error === 'object' 
    && 'message' in error
    && (error as any).message
    && typeof (error as any).message === 'string'
    && 'errorCode' in error
    && (error as any).errorCode
    && (typeof (error as any).errorCode === 'string' || typeof (error as any).errorCode === 'number')
    && 'type' in error
    && (error as any).type
    && typeof (error as any).type === 'string'
  )
};

export default isApiError;