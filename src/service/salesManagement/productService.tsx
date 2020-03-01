import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';

export interface Product {
  name: string;
  price: number;
}

export async function getAllProducts(): Promise<Array<Product>> {
  const response = await axios.get(urlConfig.url.API_URL + '/products', headerConfig)
  return response.data
}