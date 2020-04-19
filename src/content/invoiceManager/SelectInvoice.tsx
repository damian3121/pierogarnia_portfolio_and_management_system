import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  Button,
  makeStyles,
  TableFooter,
  TablePagination
} from '@material-ui/core';
import { Setter } from '../../util/TypeUtils';
import { radioValueBinding, radioChangeBinding } from '../../util/bindings';
import { TableHeader } from '../../component/table/TableHeader';
import BookIcon from '@material-ui/icons/Book';
import AddIcon from '@material-ui/icons/Add';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import moment from 'moment'
import { InvoiceDetails, invoiceService } from '../../service/salesManagement/invoiceService';
import { Notyfication, AlertType } from '../../component/notification/Notification';

interface Props {
  setSelectedInvoice: Setter<Props['selectedInvoice']>;
  selectedInvoice: InvoiceDetails | null;
  onDelete(invoice: InvoiceDetails): void;
  invoices: Array<InvoiceDetails>;
}

const useStyle = makeStyles(() => ({
  buttonCenter: {
    textAlign: 'center',
  }
}));

export function SelectInvoice({
  invoices,
  setSelectedInvoice: setSelectedInvoice,
  selectedInvoice: selectedInvoice
}: Props) {
  const cls = useStyle();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function createInvoiceHandler(invoice: InvoiceDetails) {
    invoiceService.createInvoice(invoice)
    Notyfication({ type: AlertType.SUCCES, content: "Faktura została stworzona i wysłana" })
  }

  return (
    <Paper>
      <TableHeader
        actions={
          <Button
            color='primary'
            variant='contained'
            onClick={() => location.assign('/orders')}
          >
            <BookIcon />
            zamówienia
          </Button>
        }
      >
        Zamówienia pod faktury
      </TableHeader>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'></TableCell>
            <TableCell>Nazwa klienta</TableCell>
            <TableCell>Wartość zamówienia</TableCell>
            <TableCell>Data zamówienia</TableCell>
            <TableCell>Data odbioru</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : invoices
          ).map(invoice =>
            <TableRow key={invoice.id}>
              <TableCell>
                <Radio
                  checked={
                    radioValueBinding(invoice, selectedInvoice)
                  }
                  onChange={radioChangeBinding(invoice, setSelectedInvoice)}
                />
              </TableCell>
              <TableCell>{invoice.order.customerName}</TableCell>
              <TableCell>{invoice.order.summaryPrice + " zł"}</TableCell>
              <TableCell>{moment(new Date(invoice.order.orderDate)).format('YYYY-MM-DD hh:mm')}</TableCell>
              <TableCell>{moment(new Date(invoice.order.receiptDate)).format('YYYY-MM-DD hh:mm')}</TableCell>
              <TableCell className={cls.buttonCenter}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => createInvoiceHandler(invoice)}
                >
                  <AddIcon />
                  stwórz
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={invoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Paper>
  )
}
