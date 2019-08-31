interface RequestInit {
  status: 'init';
}

interface RequestLoading {
  status: 'loading';
}

interface RequestLoaded<T> {
  status: 'loaded';
  payload: T;
}

interface RequestError {
  status: 'error';
  error: Error;
}

export type Request<T> =
  | RequestInit
  | RequestLoading
  | RequestLoaded<T>
  | RequestError;

