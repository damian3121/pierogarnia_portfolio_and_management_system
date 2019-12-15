import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Table, TableBody, TableRow, 
  TableCell, LinearProgress, Typography, TableFooter, TablePagination } from '@material-ui/core';
import { Product, getAllProducts } from '../../service/salesManagement/productService';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  title: {
    padding: '15px',
  },
});

export function ProductManagementPage() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const initialProductData: Product[] = [{
    name: '',
    price: 0
  }];

  const [products, setProducts] = useState(initialProductData);
  
  useEffect(() => {
    getAllProducts()
      .then(response => {
        setProducts(response); 
        setIsLoading(true);
      })
      .finally(() => setIsLoading(false))
  }, []);
  
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h5" id="tableTitle">
        Lista produktów
      </Typography>
      <div className={classes.tableWrapper}>
        {isLoading?<LinearProgress color="primary" />:null}
        <Table className={classes.table}>
          <TableBody>
            {(rowsPerPage > 0
            ?products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :products
            ).map(product => (
              <TableRow key={product.name}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="center">{product.price}</TableCell>
              </TableRow>
            ))
            }
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
      </div>
    </Paper>
  )
}