import { useState } from 'react';
import { Status } from './requestService';
import { urlConfig } from '../Constants';

export function requestService(props: any, endpoint: string) {
  const [service, setService] = useState({
    status: Status.INIT,
    payload: props.data
  });

  const sendRequest = (data: any) => {
    setService({ status: Status.LOADING, payload: "" });

    return new Promise((resolve, reject) => {
      fetch(urlConfig.url.API_URL + endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(response => {
          if (response.status > 400 || response.status < 500) {
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