import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';
import { getSessionStorageItem } from '../../sessionStorageItem/getSessionStorageItem';
import moment from 'moment';

export interface Order extends AddOrder {
  id: number;
}

export interface AddOrder {
  orderDate: string;
  receiptDate: string;
  customerName: string;
  customerSurname: string;
  customerCompany: string;
  orderItems: Array<OrderItem> | null;
}

export interface AddProductItems {
  productName: string;
  summaryPrice: number;
  quantity: number;
  productId: number;
}

export interface OrderItem extends AddOrderItem {
  id: number;
}

export interface AddOrderItem {
  productName: string;
  summaryPrice: number;
  quantity: number;
  productId: number;
}

export interface UpdateOrder {
  receiptDate: string;
  customerName: string;
  customerSurname: string;
  customerCompany: string;
}

export const orderService = {
  async create(order: AddOrder): Promise<AddOrder> {
    await axios.post(urlConfig.url.API_URL + '/orders', order, headerConfig);

    const added = await axios.get<AddOrder>(urlConfig.url.API_URL + '/orders?' +
      'receiptOrderDate=' + moment(order.receiptDate).format('YYYY-MM-DDTHH:mm:ss')
      + '&customerSurname=' + order.customerSurname, {
        headers: {
          'Accept': 'application/jezowe.pierogarnia.controller.order.getbydate+json',
          'Authorization': `Bearer ${getSessionStorageItem('token')}`
        }
      });

    return added.data;
  },

  async getAll(): Promise<Array<Order>> {
    const response = await axios.get(urlConfig.url.API_URL + '/orders', headerConfig)
    return response.data
  },

  async orderProductsUpdate(orderId: number, productItems: Array<AddProductItems>): Promise<Order> {
    await axios.put(urlConfig.url.API_URL + '/orders/' + orderId, productItems, {
      headers: {
        'Accept': 'application/jezowe.pierogarnia.controller.order.orderProductsUpdate+json',
        'Authorization': `Bearer ${getSessionStorageItem('token')}`
      }
    });

    const updated = await axios.get<Order>(urlConfig.url.API_URL + '/orders/' + orderId, headerConfig);

    return updated.data;
  },

  async update(id: number, orderUpdate: UpdateOrder): Promise<Order> {
    await axios.put(urlConfig.url.API_URL + '/orders/' + id, orderUpdate, {
      headers: {
        'Accept': 'application/jezowe.pierogarnia.controller.order.orderUpdate+json',
        'Authorization': `Bearer ${getSessionStorageItem('token')}`
      }
    });

    const updated = await axios.get<Order>(urlConfig.url.API_URL + '/orders/' + id, headerConfig);

    return updated.data;
  },

  async delete(id: number) {
    await axios.delete(urlConfig.url.API_URL + '/orders/' + id, headerConfig)
  },
}