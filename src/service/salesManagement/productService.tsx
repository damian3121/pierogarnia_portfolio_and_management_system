import React from 'react';
import { getSessionStorageItem } from '../../sessionStorageItem/getSessionStorageItem';
import axios from 'axios';

export interface Product {
  name: string;
  price: number;
}

const config = {
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${getSessionStorageItem('token')}`}
}

export async function getAllProducts() : Promise<Array<Product>>{
    const response = await axios.get('http://www.pierogarniajezowe.pl:8080/api/products', config)
    return response.data
}