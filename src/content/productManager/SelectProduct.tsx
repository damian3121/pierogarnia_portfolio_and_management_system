import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  Button,
  makeStyles
} from '@material-ui/core';
import { Product, productService } from '../../service/salesManagement/productService';
import { Setter } from '../../util/TypeUtils';
import { radioValueBinding, radioChangeBinding } from '../../util/bindings';
import { TableHeader } from '../../component/table/TableHeader';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/DeleteForever';
import { Notyfication, AlertType } from '../../component/notification/Notification';

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
          {products.map(product =>
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
      </Table>
    </Paper>
  )
}
