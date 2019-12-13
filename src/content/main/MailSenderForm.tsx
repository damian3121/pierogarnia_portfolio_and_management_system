import React, { useState } from 'react';
import { requestService } from '../../service/postRequestSender';
import { FormControl, TextField, makeStyles, Theme, createStyles } from '@material-ui/core';
import { ButtonForm } from '../../component/form/ButtonForm';

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
  const initialMailSenderData: MailSenderData = {
    topicMsg: '',
    name: '',
    email: '',
    message: ''
  }

  const [mailSenderData, setMailSenderData] = useState<MailSenderData>(
    initialMailSenderData
  );

  const { service, sendRequest } = requestService(initialMailSenderData, 'http://www.pierogarniajezowe.pl:8080/api/send-mail');

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
        <ButtonForm
          errorMessage="Wiadomość e-mail nie została wysłana. Spróbuj ponownie"
          successMessage="Wiadomość e-mail została wysłana poprawnie"
          textButton="Wyślij"
          service={service}
        />
      </form>
    </div>
  );
};