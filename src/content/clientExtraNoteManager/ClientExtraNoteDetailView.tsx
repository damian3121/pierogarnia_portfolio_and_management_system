import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, Grid, Theme, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TableHeader } from '../../component/table/TableHeader';
import { Fragment, useState, useEffect } from 'react';
import { mapAxiosError } from '../../util/RestUtils';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import { useLoading } from '../../hooks/useLoading';
import { fktClientService } from '../../service/salesManagement/fktClientService';
import { ClientExtraNote, AddClientExtraNote, clientExtraNoteService } from '../../service/clientExtraNoteService/clientExtraNoteService';

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
  fktCustomerId: number;
  extraInfoClientName: string;
  extraInfo: string;
}

interface Props {
  selectedClientExtraNote: ClientExtraNote | null;
  onClientExtraNoteAdded(added: AddClientExtraNote): void;
  onClientExtraNoteUpdated(updated: ClientExtraNote): void;
}

export function ClientExtraNoteDetailView({
  selectedClientExtraNote,
  onClientExtraNoteAdded,
  onClientExtraNoteUpdated
}: Props) {
  const cls = useStyle();

  const fetchedClientsExtraNotes = useLoading(
    () => fktClientService.getAll()
  )[0] || [];

  const selectClientList = fetchedClientsExtraNotes.map(function (client) {
    return {
      value: client.id,
      label: client.shortcut,
    }
  });

  const [editMode, setEditMode] = useState(false);

  const existingFktCustomerId = selectedClientExtraNote ? selectedClientExtraNote.fktCustomerId : null;
  const existingExtraInfoClientName = selectedClientExtraNote ? selectedClientExtraNote.extraInfoClientName : null;
  const existingClientExtraNote = selectedClientExtraNote ? selectedClientExtraNote.extraInfo : '';
  const isSelectedMode = selectedClientExtraNote !== null;

  useEffect(() => {
    setEditMode(isSelectedMode)
  }, [selectedClientExtraNote]);

  return (
    <Fragment>
      <TableHeader
      >
        {editMode ? 'Edycja' : 'Dodaj nowy'}
      </TableHeader>
      <Formik
        enableReinitialize
        initialValues={{
          fktCustomerId: existingFktCustomerId,
          extraInfoClientName: existingExtraInfoClientName,
          extraInfo: existingClientExtraNote
        }}
        validate={values => {
          const errors: Partial<Values> = {};
          if (!values.extraInfo) {
            errors.extraInfo = 'Pole nie może być puste';
          }

          if (!values.extraInfoClientName) {
            errors.extraInfoClientName = 'Pole nie może być puste';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          if (editMode && selectedClientExtraNote != null) {
            const updated = await clientExtraNoteService.update(selectedClientExtraNote.id, {
              extraInfo: values.extraInfo,
              extraInfoClientName: values.extraInfoClientName ? values.extraInfoClientName : '',
              fktCustomerId: values.fktCustomerId
            })
            onClientExtraNoteUpdated(updated)
            Notyfication({ type: AlertType.SUCCES, content: "Dane klienta edytowano prawidłowo" })
          } else {
            try {
              const item = await clientExtraNoteService.create({
                extraInfo: values.extraInfo,
                extraInfoClientName: values.extraInfoClientName ? values.extraInfoClientName : '',
                fktCustomerId: values.fktCustomerId
              });
              onClientExtraNoteAdded(item)
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
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  label="Klient - płatnik VAT"
                  type="text"
                  name="fktCustomerId"
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
                  name="extraInfoClientName"
                  type="text"
                  label="Nazwa notatki klienta"
                  fullWidth={true}
                  variant="filled"
                  className={cls.fieldMargin}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  name="extraInfo"
                  type="text"
                  label="Notatka do klienta"
                  fullWidth={true}
                  variant="filled"
                  className={cls.fieldMargin}
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
    </Fragment>
  );
}
