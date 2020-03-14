import React, { useEffect, useState, Fragment } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Grid, makeStyles, IconButton, Button, MenuItem } from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import { RemoveCircle } from "@material-ui/icons";
import { TableHeader } from "../../component/table/TableHeader";
import { OrderItem, orderService, Order } from "../../service/salesManagement/orderService";
import { productService } from "../../service/salesManagement/productService";
import { useLoading } from "../../hooks/useLoading";
import { Notyfication, AlertType } from "../../component/notification/Notification";

const useStyle = makeStyles(({
  fieldMargin: {
    margin: '3px',
  },
  formTypeDisplay: {
    display: 'flow-root'
  },
  buttonToRight: {
    position: 'relative',
    float: 'right',
    margin: '10px'
  }
}));

interface Props {
  orderItems: Array<OrderItem> | null
  orderId: number;
  onOrderUpdated(updated: Order): void;
}

export function ProductList(props: Props) {
  const cls = useStyle();

  const fetchedProducts = useLoading(
    () => productService.getAll()
  )[0] || [];
  const [orderProductItems, setOrderProductItems] = useState<OrderItem[]>([]);

  const selectProductList = fetchedProducts.map(function (item) {
    return {
      value: item.id,
      label: item.name + ' - ' + item.price + " zł/kg"
    }
  });

  useEffect(() => {
    const orderMapper = props.orderItems ? props.orderItems.map(it => {
      return {
        id: it.id,
        productId: it.productId,
        productName: it.productName,
        quantity: it.quantity,
        summaryPrice: it.summaryPrice
      }
    }) : []
    setOrderProductItems(orderMapper);
  }, [props.orderItems]);

  return (
    <div>
      <TableHeader>
        Produkty
      </TableHeader>
      <Formik
        enableReinitialize
        initialValues={{ orderItems: orderProductItems }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const order = await orderService.orderProductsUpdate(props.orderId, values.orderItems);
            props.onOrderUpdated(order)
            Notyfication({ type: AlertType.SUCCES, content: "Produkty dodane prawidłowo" })
          } catch (e) {
            Notyfication({ type: AlertType.SUCCES, content: "Błąd podczas składania zamówienia" })
          }
        }}
        render={({ values }) => (
          <Form className={cls.formTypeDisplay}>
            <FieldArray
              name="orderItems"
              render={arrayHelpers => (
                <div>
                  {values.orderItems && values.orderItems.length > 0 && (
                    values.orderItems.map((orderItem: any, index: number) => (
                      <Fragment>
                        <Grid container spacing={1}>
                          <Grid item xs={5} sm={5}>
                            <Field
                              component={TextField}
                              type="text"
                              name={`orderItems.${index}.productId`}
                              select
                              variant="standard"
                              margin="normal"
                              fullWidth={true}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            >
                              {selectProductList.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Field>
                          </Grid>
                          <Grid item xs={5} sm={5}>
                            <Field
                              component={TextField}
                              type="text"
                              label="Ilość"
                              name={`orderItems.${index}.quantity`}
                              fullWidth={true}
                              className={cls.fieldMargin}
                            />
                          </Grid>
                          <Grid item xs={2} sm={2}>
                            <IconButton
                              color="secondary"
                              size="medium"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <RemoveCircle />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Fragment>
                    ))
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    className={cls.buttonToRight}
                    type="submit"
                  >
                    zamów
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={cls.buttonToRight}
                    onClick={() => arrayHelpers.push("")}
                  >
                    dodaj produkt
                  </Button>
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  )
}