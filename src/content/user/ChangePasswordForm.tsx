import React, { useState } from 'react';
import { makeStyles, Dialog, IconButton, DialogContent, DialogTitle } from '@material-ui/core';
import { Formik, Field } from 'formik';
import { TextFieldInput } from '../../component/input/TextFieldInput';
import { ButtonForm } from '../../component/form/ButtonForm';
import { requestService } from '../../service/postRequestSender';
import Cancel from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

interface PasswordChange {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

interface Props {
  isShowing: boolean;
  closeModal(): void
}

const initialPasswordChange: PasswordChange = {
  newPassword: '',
  oldPassword: '',
  repeatNewPassword: '',
};

export function ChangePasswordForm(props: Props) {
  const classes = useStyles();
  const { service, sendRequest } = requestService(initialPasswordChange, '/save-password');

  const [passwordChange, setPasswordChange] = useState<PasswordChange>(
    initialPasswordChange
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRequest(passwordChange)
      .then(() => setPasswordChange(initialPasswordChange))
  };

  return (
    <Dialog
      open={props.isShowing}>
      <DialogTitle>Zmień hasło
        <IconButton className={classes.closeButton} onClick={props.closeModal}>
          <Cancel />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={initialPasswordChange}
          validate={values => {
            const errors = {
              oldPassword: '',
              newPassword: '',
              repeatNewPassword: ''
            };
            if (!values.oldPassword) {
              errors.oldPassword = 'Pole jest wymagane';
            }
            if (!values.newPassword) {
              errors.newPassword = 'Pole jest wymagane';
            }
            if (!values.repeatNewPassword) {
              errors.repeatNewPassword = 'Pole jest wymagane'
            }
            if (values.newPassword != values.repeatNewPassword) {
              errors.repeatNewPassword = 'Hasła się nie zgadzają'
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            handleChange,
            values
          }) => (
              <form className={classes.form} onSubmit={handleFormSubmit} onClick={() => setPasswordChange(values)}>
                <Field
                  name="oldPassword"
                  type="password"
                  label="Stare hasło"
                  component={TextFieldInput}
                  variant="filled"
                  fullWidth={true}
                  margin="normal"
                  onChange={handleChange}
                  value={values.oldPassword}
                />
                <Field
                  name="newPassword"
                  type="password"
                  label="Nowe hasło"
                  component={TextFieldInput}
                  variant="filled"
                  fullWidth={true}
                  margin="normal"
                  onChange={handleChange}
                  value={values.newPassword}
                />
                <Field
                  name="repeatNewPassword"
                  type="password"
                  label="Powtórz nowe hasło"
                  component={TextFieldInput}
                  variant="filled"
                  fullWidth={true}
                  margin="normal"
                  onChange={handleChange}
                  value={values.repeatNewPassword}
                />
                <ButtonForm
                  textButton="Zmień"
                  errorMessage="Błędne dane"
                  service={service}
                  fullWidth={false}
                  successMessage="Hasło zostało zmienione"
                  onClick={close}
                />
              </form>
            )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}