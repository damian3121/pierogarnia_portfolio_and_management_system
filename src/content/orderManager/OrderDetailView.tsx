import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, Grid, Theme, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TableHeader } from '../../component/table/TableHeader';
import { Fragment, useState, useEffect } from 'react';
import { mapAxiosError } from '../../util/RestUtils';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import { Order, orderService, OrderItem, AddOrder } from '../../service/salesManagement/orderService';
import { ProductList } from './ProductList';
import { KeyboardDateTimePickerInput } from '../../component/input/KeyboardDateTimePickerInput';
import moment from 'moment';
import { useLoading } from '../../hooks/useLoading';
import { fktClientService } from '../../service/salesManagement/fktClientService';

const useStyle = makeStyles((theme: Theme) => ({
  fieldMargin: {
    margin: '3px',
  },
  formTypeDisplay: {
    display: 'flow-root'
  },
  buttonToRight: {
    position: 'relative',
    float: 'right',
    marginTop: '10px',
    marginBottom: '10px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

interface Values {
  orderDate: string;
  receipt: string;
  customerId: number;
  customerName: string;
  orderItems: Array<OrderItem>;
}

interface Props {
  selectedOrder: Order | null;
  onOrderAdded(added: AddOrder): void;
  onOrderUpdated(updated: Order): void;
}

export function OrderDetailView({
  selectedOrder,
  onOrderAdded: onOrderAdded,
  onOrderUpdated: onOrderUpdated
}: Props) {
  const cls = useStyle();

  const fetchedFktClients = useLoading(
    () => fktClientService.getAll()
  )[0] || [];

  const selectClientList = fetchedFktClients.map(function (client) {
    return {
      value: client.id,
      label: client.shortcut,
    }
  });

  const [selectedDate, handleDateChange] = useState();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    handleDateChange(selectedOrder?selectedOrder.receiptDate:null)
    setEditMode(selectedOrder != null)
  }, [selectedOrder]);

  return (
    <Fragment>
      <TableHeader
      >
        {editMode ? 'Edycja' : 'Dodaj nowy'}
      </TableHeader>
      <Formik
        enableReinitialize
        initialValues={{
          customerId: selectedOrder ? selectedOrder.customerId : null,
          customerName: selectedOrder ? selectedOrder.customerName : '',
          receiptDate: selectedOrder ? selectedOrder.receiptDate : '',
          orderItems: null
        }}
        validate={values => {
          const errors: Partial<Values> = {};
          if (!values.customerName) {
            errors.customerName = 'Pole nie może być puste';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          if (editMode && selectedOrder != null) {
            const updated = await orderService.update(selectedOrder.id, {
              customerName: values.customerName,
              customerId: values.customerId,
              receiptDate: values.receiptDate
            })
            console.log(updated)
            onOrderUpdated(updated)
            Notyfication({ type: AlertType.SUCCES, content: "Dane klienta edytowano prawidłowo" })
          } else {
            try {
              const item = await orderService.create({
                customerId: values.customerId,
                customerName: values.customerName,
                receiptDate: moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
                orderItems: values.orderItems,
              });
              onOrderAdded(item)
              setEditMode(true)
              Notyfication({ type: AlertType.SUCCES, content: "Produkt dodano prawidłowo" })
            } catch (e) {
              mapAxiosError(e, {
                409() {
                  Notyfication({ type: AlertType.ERROR, content: "Produkt już istnieje" })
                }
              });
            }
          }
          setSubmitting(false)
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={cls.formTypeDisplay}>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  label="Klient - płatnik VAT"
                  type="text"
                  name="customerId"
                  select
                  variant="filled"
                  margin="normal"
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {selectClientList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  name="customerName"
                  type="text"
                  label="Imię i nazwisko"
                  fullWidth={true}
                  variant="filled"
                  className={cls.fieldMargin}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={KeyboardDateTimePickerInput}
                  name="receiptDate"
                  formatDate="yyyy-MM-dd hh:mm a"
                  fullWidth={true}
                  handleDateChange={handleDateChange}
                  inputVariant="filled"
                  labelContent="Data odbioru"
                  selectedDate={selectedDate}
                />
              </Grid>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                className={cls.buttonToRight}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {editMode ? 'edytuj' : 'dodaj'}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
      {editMode &&
        <ProductList
          orderItems={selectedOrder ? selectedOrder.orderItems : []}
          orderId={selectedOrder ? selectedOrder.id : 0}
          onOrderUpdated={onOrderUpdated}
        />
      }
    </Fragment>
  );
}