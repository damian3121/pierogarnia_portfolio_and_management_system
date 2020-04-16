import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';

export interface ClientExtraNote extends AddClientExtraNote {
  id: number;
}

export interface AddClientExtraNote {
  fktCustomerId: number | null;
  extraInfoClientName: string | null;
  extraInfo: string;
}

export const clientExtraNoteService = {
  async create(clientExtraNote: AddClientExtraNote): Promise<AddClientExtraNote> {
    await axios.post(urlConfig.url.API_URL + '/client-details', clientExtraNote, headerConfig);

    const added = await axios.get<AddClientExtraNote>(urlConfig.url.API_URL + '/client-details/name/'
      + clientExtraNote.extraInfoClientName, headerConfig);

    return added.data;
  },

  async getAll(): Promise<Array<ClientExtraNote>> {
    const response = await axios.get(urlConfig.url.API_URL + '/client-details', headerConfig)
    return response.data
  },

  async update(id: number, clientExtraNote: AddClientExtraNote): Promise<ClientExtraNote> {
    await axios.put(urlConfig.url.API_URL + '/client-details/' + id, clientExtraNote, headerConfig);

    const updated = await axios.get<ClientExtraNote>(urlConfig.url.API_URL + '/client-details/' + id, headerConfig);

    return updated.data;
  },

  async delete(id: number) {
    await axios.delete(urlConfig.url.API_URL + '/client-details/' + id, headerConfig)
  },
}