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
import { Product, productService } from '../../service/salesManagement/productService';
import { Setter } from '../../util/TypeUtils';
import { radioValueBinding, radioChangeBinding } from '../../util/bindings';
import { TableHeader } from '../../component/table/TableHeader';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/DeleteForever';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

interface Props {
  setSelectedProduct: Setter<Props['selectedProduct']>;
  selectedProduct: Product | null;
  onDeleteProduct(id: number): void;
  products: Array<Product>;
}

const useStyle = makeStyles(() => ({
  buttonCenter: {
    textAlign: 'center',
  }
}));

export function SelectProduct({
  products,
  setSelectedProduct,
  onDeleteProduct,
  selectedProduct
}: Props) {
  const cls = useStyle();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function deleteHandler(id: number) {
    productService.delete(id)
    onDeleteProduct(id)
    Notyfication({ type: AlertType.SUCCES, content: "Produkt został usunięty." })
    setSelectedProduct(null)
  }

  return (
    <Paper>
      <TableHeader
        actions={
          <Button
            color='primary'
            variant='contained'
            onClick={() => setSelectedProduct(null)}
          >
            <AddIcon />
            NOWY
          </Button>
        }
      >
        Produkty
      </TableHeader>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'></TableCell>
            <TableCell>Nazwa</TableCell>
            <TableCell>Cena</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : products
          ).map(product =>
            <TableRow key={product.id}>
              <TableCell>
                <Radio
                  checked={
                    radioValueBinding(product, selectedProduct)
                  }
                  onChange={radioChangeBinding(product, setSelectedProduct)}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className={cls.buttonCenter}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => deleteHandler(product.id)}
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
              count={products.length}
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
