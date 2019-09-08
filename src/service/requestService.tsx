export enum Status {
  INIT,
  LOADING,
  LOADED,
  ERROR
}

interface RequestInit {
  status: Status.INIT;
}

interface RequestLoading {
  status: Status.LOADING;
}

export interface RequestLoaded<T> {
  status: Status.LOADED;
  payload: T;
}

interface RequestError {
  status: Status.ERROR;
  error: Error;
}

export type Request<T> =
  | RequestInit
  | RequestLoading
  | RequestLoaded<T>
  | RequestError;

