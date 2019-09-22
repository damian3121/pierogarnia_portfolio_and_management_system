import { useState } from 'react';
import { Request, Status } from './requestService';
import ActionSnackbar from '../component/snackbar/ActionSnackbar';

interface Props { }

export function requestService(props: Props, endpoint: string) {
  const [service, setService] = useState<Request<Props>>({
    status: Status.INIT
  });

  const sendRequest = (data: Props) => {
    setService({ status: Status.LOADING });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      })
        .then(response => response.text())
        .then(response => {
          setService({ status: Status.LOADED, payload: response });
          resolve(response);
        })
        .catch(error => {
          setService({ status: Status.ERROR, error });
          reject(error);
        });
    });
  };

  return {
    service,
    sendRequest
  };
};