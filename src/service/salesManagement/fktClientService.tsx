import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';

export interface FktClient {
  id: number;
  name: string;
  tax_no: string;
  shortcut: string;
}

export const fktClientService = {

  async getAll(): Promise<Array<FktClient>> {
    const response = await axios.get(urlConfig.url.API_URL + '/fkt-clients', headerConfig)
    return response.data
  },
}