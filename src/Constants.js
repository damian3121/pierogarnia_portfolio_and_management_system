import { getSessionStorageItem } from './sessionStorageItem/getSessionStorageItem';

const prod = {
    url: {
        API_URL: 'www.pierogarniajezowe.pl/api'
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:8080'
    }
};

const prodDeployment = {
    url: {
        URL: 'www.pierogarniajezowe.pl'
    }
};
const devDeployment = {
    url: {
        URL: 'http://localhost:3000'
    }
};
export const urlConfig = process.env.NODE_ENV === 'development' ? dev : prod;

export const urlDeployment = process.env.NODE_ENV === 'development' ? devDeployment : prodDeployment;

export const headerConfig = {
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${getSessionStorageItem('token')}`
    }
}