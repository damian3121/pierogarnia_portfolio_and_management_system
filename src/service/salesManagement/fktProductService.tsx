import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';

export interface FktProduct {
  id: number;
  name: string;
  price_net: string;
  price_gross: string;
}

// export interface AddProduct {
//   name: string;
//   price: number;
//   fktPriceNet: string;
//   fktPriceGross: string;
//   fktProductId: number;
// }

export const fktProductService = {
  // async create(product: AddProduct): Promise<Product> {
  //   await axios.post(urlConfig.url.API_URL + '/products', product, headerConfig);

  //   const added = await this.getByName(product.name)

  //   return added
  // },

  async getAll(): Promise<Array<FktProduct>> {
    const response = await axios.get(urlConfig.url.API_URL + '/fkt-products', headerConfig)
    return response.data
  },

  // async getByName(productName: string): Promise<Product> {
  //   const product = await axios.get<Product>(urlConfig.url.API_URL + '/products/name/' + productName, headerConfig);

  //   return product.data;
  // },

  // async update(product: Product): Promise<Product> {
  //   await axios.put(urlConfig.url.API_URL + '/products/' + product.id, product, headerConfig);

  //   const updated = await this.getByName(product.name)

  //   return updated;
  // },

  // async delete(id: number) {
  //   await axios.delete(urlConfig.url.API_URL + '/products/' + id, headerConfig)
  // }
}