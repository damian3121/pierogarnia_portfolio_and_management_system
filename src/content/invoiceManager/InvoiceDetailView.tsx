import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, Grid, Theme, MenuItem, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TableHeader } from '../../component/table/TableHeader';
import { Fragment, useState, useEffect } from 'react';
import { OrderItem } from '../../service/salesManagement/orderService';
import { InvoiceDetails, InvoiceOrder, InvoiceStatusType, InvoicePaymentType, Currency, invoiceService, AddInvoice } from '../../service/salesManagement/invoiceService';
import { KeyboardDatePickerInput } from '../../component/input/KeyboardDatePickerInput';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import moment from 'moment';
import { useLoading } from '../../hooks/useLoading';
import { clientExtraNoteService } from '../../service/clientExtraNoteService/clientExtraNoteService';

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
  },
  table: {
    minWidth: 650,
  },
}));

interface Values {
  orderDate: string;
  receipt: string;
  customerId: number;
  customerName: string;
  payerVat: boolean;
  orderItems: Array<OrderItem>;
  invoiceDetails: InvoiceDetails | null;
}

interface Props {
  selectedInvoice: InvoiceDetails | null;
  onInvoiceAdded(added: AddInvoice): void;
}

export function InvoiceDetailView({
  selectedInvoice,
  onInvoiceAdded: onInvoiceAdded
}: Props) {
  const cls = useStyle();

  const fetchedClientsExtraNote = useLoading(
    () => clientExtraNoteService.getAll()
  )[0] || [];

  const selectClientNotesList = fetchedClientsExtraNote.map(function (note) {
    return {
      value: note.extraInfo,
      label: note.extraInfoClientName,
    }
  });

  const [selectedIssueDate, handleIssueDateChange] = useState();
  const [selectedPaidDate, handlePaidDateChange] = useState();
  const [selectedSellDate, handleSellDateChange] = useState();

  const existingIssueDate = selectedInvoice ? selectedInvoice.issueDate : null;
  const existingPaidDate = selectedInvoice ? selectedInvoice.paidDate : null;
  const existingSellDate = selectedInvoice ? selectedInvoice.sellDate : null;
  const existingPaymentToKind = selectedInvoice ? selectedInvoice.paymentToKind : '';
  const existingPaymentType = selectedInvoice ? selectedInvoice.paymentType : '';
  const existingInvoiceStatusType = selectedInvoice ? selectedInvoice.status : '';
  const existingCurrency = selectedInvoice ? selectedInvoice.currency : '';
  const existingInvoiceExtraNote = selectedInvoice ? selectedInvoice.invoiceExtraNote : '';
  const isInvoiceFilled = selectedInvoice ? selectedInvoice.order.issuedInvoice : false;

  const [issueInvoiceMode, setIssueInvoiceMode] = useState(false);
  const isSelectedMode = selectedInvoice !== null;

  useEffect(() => {
    handleIssueDateChange(existingIssueDate)
    handlePaidDateChange(existingPaidDate)
    handleSellDateChange(existingSellDate)
    setIssueInvoiceMode(isSelectedMode)
  }, [selectedInvoice]);


  return (
    <Fragment>
      <TableHeader
      >
      </TableHeader>
      <Formik
        enableReinitialize
        initialValues={{
          issueDate: existingIssueDate,
          paidDate: existingPaidDate,
          sellDate: existingSellDate,
          paymentToKind: existingPaymentToKind,
          paymentType: existingPaymentType,
          status: existingInvoiceStatusType,
          currency: existingCurrency,
          invoiceExtraNote: existingInvoiceExtraNote
        }}
        validate={
          values => {
            const errors: Partial<Values> = {};
          }
        }
        onSubmit={async (values, { setSubmitting }) => {
          if (selectedInvoice != null) {
            const added = await invoiceService.create(selectedInvoice.order.id, {
              currency: values.currency,
              issueDate: moment(selectedIssueDate).format('YYYY-MM-DD'),
              paidDate: moment(selectedPaidDate).format('YYYY-MM-DD'),
              paymentToKind: values.paymentToKind,
              paymentType: values.paymentType,
              sellDate: moment(selectedSellDate).format('YYYY-MM-DD'),
              invoiceExtraNote: values.invoiceExtraNote,
              status: values.status
            })
            onInvoiceAdded(added)
            Notyfication({ type: AlertType.SUCCES, content: "Fakturę dodano prawidłowo" })
          }
          // if (editMode && selectedInvoice != null) {
          //   const updated = await orderService.update(selectedInvoice.id, {
          //     payerVat: values.payerVat,
          //     customerName: values.customerName,
          //     customerId: values.customerId,
          //     receiptDate: values.receiptDate
          //   })
          //   onOrderUpdated(updated)
          //   Notyfication({ type: AlertType.SUCCES, content: "Dane klienta edytowano prawidłowo" })
          // } else {
          //   try {
          //     const item = await orderService.create({
          //       customerId: values.customerId,
          //       customerName: values.customerName,
          //       payerVat: clientIsPayerVat,
          //       receiptDate: moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
          //       orderItems: values.orderItems,
          //     });
          //     onInvoiceAdded(item)
          //     setEditMode(true)
          //     Notyfication({ type: AlertType.SUCCES, content: "Produkt dodano prawidłowo" })
          //   } catch (e) {
          //     mapAxiosError(e, {
          //       409() {
          //         Notyfication({ type: AlertType.ERROR, content: "Produkt już istnieje" })
          //       }
          //     });
          //   }
          // }
          setSubmitting(false)
        }}
      >
        {({ submitForm }) => (
          <Form className={cls.formTypeDisplay}>

            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <Field
                  component={KeyboardDatePickerInput}
                  name="issueDate"
                  formatDate="yyyy-MM-dd"
                  fullWidth={true}
                  disabled={isInvoiceFilled}
                  handleDateChange={handleIssueDateChange}
                  inputVariant="filled"
                  labelContent="Data wystawienia"
                  selectedDate={selectedIssueDate}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={KeyboardDatePickerInput}
                  name="paidDate"
                  formatDate="yyyy-MM-dd"
                  disabled={isInvoiceFilled}
                  fullWidth={true}
                  handleDateChange={handlePaidDateChange}
                  inputVariant="filled"
                  labelContent="Data płatności"
                  selectedDate={selectedPaidDate}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={KeyboardDatePickerInput}
                  name="sellDate"
                  formatDate="yyyy-MM-dd"
                  disabled={isInvoiceFilled}
                  fullWidth={true}
                  handleDateChange={handleSellDateChange}
                  inputVariant="filled"
                  labelContent="Data sprzedaży"
                  selectedDate={selectedSellDate}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  type="number"
                  label="Ilość dni na płatność"
                  name="paymentToKind"
                  disabled={isInvoiceFilled}
                  fullWidth={true}
                  variant="filled"
                  spacing="2"
                  className={cls.fieldMargin}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  label="Notatka do faktury"
                  type="text"
                  name="invoiceExtraNote"
                  disabled={isInvoiceFilled}
                  select
                  variant="filled"
                  margin="normal"
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {selectClientNotesList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Field
                  component={TextField}
                  label="Status faktury"
                  type="text"
                  name="status"
                  disabled={isInvoiceFilled}
                  select
                  variant="filled"
                  margin="normal"
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {InvoiceStatusType.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Field
                  component={TextField}
                  label="Typ płatności"
                  type="text"
                  name="paymentType"
                  disabled={isInvoiceFilled}
                  select
                  variant="filled"
                  margin="normal"
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {InvoicePaymentType.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Field
                  component={TextField}
                  label="Waluta"
                  type="text"
                  name="currency"
                  disabled={isInvoiceFilled}
                  select
                  variant="filled"
                  margin="normal"
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {Currency.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                className={cls.buttonToRight}
                disabled={isInvoiceFilled}
                onClick={submitForm}
              >
                zatwierdź dane faktury
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}
