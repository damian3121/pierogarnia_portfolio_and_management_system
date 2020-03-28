import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  price: number;
  fktPriceNet: number;
  fktPriceGross: number;
  fktProductId: number;
}

export interface AddProduct {
  name: string;
  price: number;
  fktPriceNet: number;
  fktPriceGross: number;
  fktProductId: number;
}

export const productService = {
  async create(product: AddProduct): Promise<Product> {
    await axios.post(urlConfig.url.API_URL + '/products', product, headerConfig);

    const added = await this.getByName(product.name)

    return added
  },

  async getAll(): Promise<Array<Product>> {
    const response = await axios.get(urlConfig.url.API_URL + '/products', headerConfig)
    return response.data
  },

  async getByName(productName: string): Promise<Product> {
    const product = await axios.get<Product>(urlConfig.url.API_URL + '/products/name/' + productName, headerConfig);

    return product.data;
  },

  async update(product: Product): Promise<Product> {
    await axios.put(urlConfig.url.API_URL + '/products/' + product.id, product, headerConfig);

    const updated = await this.getByName(product.name)

    return updated;
  },

  async delete(id: number) {
    await axios.delete(urlConfig.url.API_URL + '/products/' + id, headerConfig)
  }
}