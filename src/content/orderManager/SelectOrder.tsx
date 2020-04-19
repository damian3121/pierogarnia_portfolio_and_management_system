import React, { useState, Fragment } from 'react';
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
import BookIcon from '@material-ui/icons/Book';
import { orderService } from '../../service/salesManagement/orderService';
import { Setter } from '../../util/TypeUtils';
import { radioValueBinding, radioChangeBinding } from '../../util/bindings';
import { TableHeader } from '../../component/table/TableHeader';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/DeleteForever';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { Order } from '../../service/salesManagement/orderService';
import moment from 'moment'

interface Props {
  setSelectedOrder: Setter<Props['selectedOrder']>;
  selectedOrder: Order | null;
  onDelete(order: Order): void;
  orders: Array<Order>;
}

const useStyle = makeStyles(() => ({
  buttonCenter: {
    textAlign: 'center',
  },
  buttonRightMaring: {
    marginRight: 10
  }
}));

export function SelectOrder({
  orders,
  setSelectedOrder,
  onDelete,
  selectedOrder
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

  function deleteHandler(order: Order) {
    orderService.delete(order.id)
    onDelete(order)
    Notyfication({ type: AlertType.SUCCES, content: "Zamówienie zostało usunięte." })
    setSelectedOrder(null)
  }

  return (
    <Paper>
      <TableHeader
        actions={
          <Fragment>
            <Button
              color='primary'
              variant='contained'
              className={cls.buttonRightMaring}
              onClick={() => location.assign('/invoices')}
            >
              <BookIcon />
            faktury
            </Button>
            <Button
              color='primary'
              variant='contained'
              onClick={() => setSelectedOrder(null)}
            >
              <AddIcon />
            NOWY
          </Button>
          </Fragment>
        }
      >
        Zamówienia
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
            ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : orders
          ).map(order =>
            <TableRow key={order.id}>
              <TableCell>
                <Radio
                  checked={
                    radioValueBinding(order, selectedOrder)
                  }
                  onChange={radioChangeBinding(order, setSelectedOrder)}
                />
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.summaryPrice + " zł"}</TableCell>
              <TableCell>{moment(new Date(order.orderDate)).format('YYYY-MM-DD hh:mm')}</TableCell>
              <TableCell>{moment(new Date(order.receiptDate)).format('YYYY-MM-DD hh:mm')}</TableCell>
              <TableCell className={cls.buttonCenter}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => deleteHandler(order)}
                >
                  <Delete />
                  usuń
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={orders.length}
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
      </Table>
    </Paper>
  )
}
