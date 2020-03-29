import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';

export interface FktProduct {
  id: number;
  name: string;
  price_net: string;
  price_gross: string;
}

export const fktProductService = {

  async getAll(): Promise<Array<FktProduct>> {
    const response = await axios.get(urlConfig.url.API_URL + '/fkt-products', headerConfig)
    return response.data
  },
}