import { useState } from 'react';
import { Request } from './requestService';

interface Props{}

export function requestService(props: Props, endpoint: string) {
  const [service, setService] = useState<Request<Props>>({
    status: 'init'
  });

  const sendRequest = (data: Props) => {
    setService({ status: 'loading' });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      })
        .then(response => response.json())
        .then(response => {
          setService({ status: 'loaded', payload: response });
          resolve(response);
        })
        .catch(error => {
          setService({ status: 'error', error });
          reject(error);
        });
    });
  };

  return {
    service,
    sendRequest
  };
};