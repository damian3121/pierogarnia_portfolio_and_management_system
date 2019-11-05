import { useState } from 'react';
import { Status } from './requestService';
import { getSessionStorageItem } from '../sessionStorageItem/getSessionStorageItem';

export function requestService(props: any, endpoint: string) {
  const [service, setService] = useState({
    status: Status.INIT,
    payload: props.data
  });

  const sendRequest = (data: any) => {
    setService({ status: Status.LOADING, payload: "" });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authentication': `Bearer ${getSessionStorageItem('token')}`,
        }
      })
        .then(response => response)
        .then(response => {
          if (response.status == 401) {
            throw Promise.reject("Not success!");
          }
          setService({ status: Status.LOADED, payload: response });
          resolve(response);
        })
        .catch(error => {
          setService({ status: Status.ERROR, payload: "" });
          reject(error);
        });
    });
  };

  return {
    service,
    sendRequest
  };
};