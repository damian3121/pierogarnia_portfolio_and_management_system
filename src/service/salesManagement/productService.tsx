import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';
import { getSessionStorageItem } from '../../sessionStorageItem/getSessionStorageItem';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface AddProduct {
  name: string;
  price: number;
}

export const productService = {
  async getAllProducts(): Promise<Array<Product>> {
    const response = await axios.get(urlConfig.url.API_URL + '/products', headerConfig)
    return response.data
  },

  async create(product: AddProduct): Promise<Product> {
    await axios.post(urlConfig.url.API_URL + '/products/create', product, headerConfig);

    const added = await axios.get<Product>(urlConfig.url.API_URL + '/products/' + product.name, {
      headers: {
        'Accept': 'application/jezowe.pierogarnia.controller.user.getbyname+json',
        'Authorization': `Bearer ${getSessionStorageItem('token')}`
      }
    });

    return added.data;
  },

  async delete(id: number){
    await axios.delete(urlConfig.url.API_URL + '/products/' + id, {
      headers: {
        'Accept': 'application/jezowe.pierogarnia.controller.user.getbyid+json',
        'Authorization': `Bearer ${getSessionStorageItem('token')}`
      }
    })
  },

  async update(product: Product): Promise<Product> {
    await axios.put(urlConfig.url.API_URL + '/products/update', product, headerConfig);

    const updated = await axios.get<Product>(urlConfig.url.API_URL + '/products/' + product.name, {
      headers: {
        'Accept': 'application/jezowe.pierogarnia.controller.user.getbyname+json',
        'Authorization': `Bearer ${getSessionStorageItem('token')}`
      }
    });

    return updated.data;
  },
}