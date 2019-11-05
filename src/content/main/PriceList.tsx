import React, { Fragment } from 'react';
import { Theme, makeStyles, createStyles, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import ActionSnackbar from '../../component/snackbar/ActionSnackbar';
import { Status } from '../../service/requestService';

interface Product {
  lp: string;
  productName: string;
  price: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 300,
    },
    tittlePadding: {
      padding: '15px',
    },
    cellWidth: {
      width: '45%',
    },
    lpCellWidth: {
      width: '10%',
    }
  })
)

const rowHeading = [
  {
    lp: "Lp.",
    product: "Produkt",
    price: "Cena"
  }
]

const rowValue: Array<Product> = [
  {
    lp: "1",
    productName: "Pierogi ruskie",
    price: "15.50 zł/kg"
  },
  {
    lp: "2",
    productName: "Pierogi z kapustą i pieczarkami",
    price: "17.20 zł/1kg"
  },
  {
    lp: "3",
    productName: "Pierogi z kaszą gryczaną i pieczarką",
    price: "16.50 zł/1kg"
  },
  {
    lp: "4",
    productName: "Pierogi z kaszą jaglaną i serem na słono",
    price: "16.40 zł/1kg"
  },
  {
    lp: "5",
    productName: "Pierogi firmowe (spróbuj koniecznie!)",
    price: "15.70 zł/1kg"
  },
  {
    lp: "6",
    productName: "Pierogi na słodko z serem",
    price: "19.15 zł/1kg"
  },
  {
    lp: "7",
    productName: "Pierogi z owocami(tylko w sezonie)",
    price: "--.-- zł/1kg"
  },
  {
    lp: "8",
    productName: "Pierogi ze szpinakiem",
    price: "15.80 zł/1kg"
  },
  {
    lp: "9",
    productName: "Krokiety z kapustą i mięsem",
    price: "19.70 zł/1kg"
  },
  {
    lp: "10",
    productName: "Krokiety z kapustą i pieczarka",
    price: "18.10 zł/1kg"
  },
  {
    lp: "11",
    productName: "Gołąbki",
    price: "18.90 zł/1kg"
  },
  {
    lp: "12",
    productName: "Kopytka",
    price: "12.50 zł/1kg"
  },
  {
    lp: "13",
    productName: "Kluski śląskie z nadzieniem",
    price: "16.70 zł/1kg"
  },
  {
    lp: "14",
    productName: "Kluski śląskie bez nadzienia",
    price: "14.70 zł/1kg"
  },
  {
    lp: "15",
    productName: "Kapuśniaki (na zamówienie)",
    price: "29.00 zł/1kg"
  },
  {
    lp: "16",
    productName: "Uszka z pieczarkami",
    price: "30.00 zł/1kg"
  },
  {
    lp: "17",
    productName: "Naleśniki z nadzieniem	",
    price: "19.00 zł/1kg"
  },
]
export function PriceList() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.tittlePadding} variant="h5" id="tableTitle">
        Cennik
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {rowHeading.map(cell => (
              <Fragment>
                <TableCell className={classes.lpCellWidth}>{cell.lp}</TableCell>
                <TableCell className={classes.cellWidth}>{cell.product}</TableCell>
                <TableCell className={classes.cellWidth}>{cell.price}</TableCell>
              </Fragment>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowValue.map(cell => (
            <TableRow>
              <TableCell>{cell.lp}</TableCell>
              <TableCell>{cell.productName}</TableCell>
              <TableCell>{cell.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ActionSnackbar
        status={Status.INIT}
        content={"Jeśli nie widzisz którejś z kolumn, przesuń palcem po ekranie od prawej do lewej strony. Tabela przesunie się :)"}
        variant="info"
      />
    </Paper>
  )
}