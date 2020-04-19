import { headerConfig, urlConfig } from '../../Constants';
import axios from 'axios';
import { Status } from '../requestService';
import { OrderItem } from './orderService';

interface MapValue {
  value: string;
  label: string;
}

export const InvoiceStatusType: Array<MapValue> = [
  {
    value: "PAID",
    label: "Zapłacono"
  }
];

export const InvoicePaymentType: Array<MapValue> = [
  {
    value: "CASH",
    label: "Gotówka"
  },
  {
    value: "XX",
    label: "Przelew"
  }
];

export const Currency: Array<MapValue> = [
  {
    value: "PLN",
    label: "zł"
  },
  {
    value: "EUR",
    label: "euro"
  }
];

export interface AddInvoice {
  issueDate: string;
  paidDate: string;
  sellDate: string;
  paymentToKind: string;
  status: string;
  paymentType: string;
  currency: string;
  invoiceExtraNote: String;
}

export interface InvoiceDetails extends AddInvoice {
  id: number;
  order: InvoiceOrder;
}

export interface InvoiceOrder {
  id: number;
  receiptDate: string;
  orderDate: string;
  customerName: string;
  customerId: number | null;
  payerVat: boolean;
  summaryPrice: number;
  issuedInvoice: boolean;
  orderItems: Array<OrderItem> | null;
}

export const invoiceService = {
  async getAll(): Promise<Array<InvoiceDetails>> {
    const response = await axios.get(urlConfig.url.API_URL + '/invoice', headerConfig)
    return response.data
  },

  async create(id: number, invoice: AddInvoice): Promise<InvoiceDetails> {
    const response = await axios.post(urlConfig.url.API_URL + '/invoice/' + id,
      invoice, headerConfig)
    return response.data
  },

  async createInvoice(invoice: InvoiceDetails) {
    const response = await axios.post('https://o23523.fakturownia.pl/invoices.json?api_token=S2kbTzpKSlz5iIcu8S/o23523', {

    })
  }
}