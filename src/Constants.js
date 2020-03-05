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
export const urlConfig = process.env.NODE_ENV === 'development' ? dev : prod;

export const headerConfig = {
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${getSessionStorageItem('token')}`
    }
}