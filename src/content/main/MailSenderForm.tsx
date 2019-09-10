import React, { useState } from 'react';
import { requestService } from '../../service/requestSender';
import { FormControl, TextField, Button, CircularProgress, makeStyles, Theme, createStyles } from '@material-ui/core';
import ActionSnackbar from '../../component/snackbar/ActionSnackbar';
import { Status } from '../../service/requestService';

interface MailSenderData {
  topicMsg: string;
  name: string;
  email: string;
  message: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      right: '50%',
      marginTop: -12,
      marginRight: -12,
    },
  }),
);

export function MailSenderForm() {
  const classes = useStyles();

  const initialMailSenderData: MailSenderData = {
    topicMsg: '',
    name: '',
    email: '',
    message: ''
  }

  const [mailSenderData, setMailSenderData] = useState<MailSenderData>(
    initialMailSenderData
  );

  const { service, sendRequest } = requestService(initialMailSenderData, 'https://swapi.co/api/starships');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setMailSenderData(prevMail => ({
      ...prevMail,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRequest(mailSenderData).then(() => setMailSenderData(initialMailSenderData));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <FormControl fullWidth={true}>
          <TextField
            id="topicMsg"
            label="Temat wiadomości"
            type="topicMsg"
            name="topicMsg"
            value={mailSenderData.topicMsg}
            variant="filled"
            onChange={handleChange}
            required={true}
          />
          <TextField
            id="name"
            label="Imię i nazwisko"
            type="name"
            name="name"
            value={mailSenderData.name}
            margin="normal"
            variant="filled"
            onChange={handleChange}
            required={true}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            value={mailSenderData.email}
            margin="normal"
            variant="filled"
            onChange={handleChange}
            required={true}
          />
          <TextField
            id="message"
            label="Wiadomość"
            type="message"
            name="message"
            value={mailSenderData.message}
            margin="normal"
            variant="filled"
            onChange={handleChange}
            required={true}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth={false}
          disabled={service.status === Status.LOADING}
        >
          WYŚLIJ
          {service.status === Status.LOADING &&
            <CircularProgress size={24} color="secondary" className={classes.buttonProgress} />
          }
        </Button>
      </form>
      {
        service.status === Status.LOADED && 
          <ActionSnackbar 
            status={service.status} 
            content={"Wiadomość email została wysłana."}
            variant="success"
          />                
      }
      {
        service.status === Status.ERROR && 
          <ActionSnackbar 
            status={service.status}
            content={"Nie można wysłać wiadomości email."}
            variant="error"
          />
      }

    </div>
  );
};