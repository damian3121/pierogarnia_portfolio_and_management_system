import React, { useState } from 'react';
import {
  makeStyles, Theme, createStyles, Grid,
  Typography, Avatar, CssBaseline, TextField
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import { Status } from '../../service/requestService';
import { requestService } from '../../service/postResponseRequestSender';
import InfoCard from '../../component/card/InfoCard';
import { getSessionStorageItem } from '../../sessionStorageItem/getSessionStorageItem';
import { setSessionStorageItem } from '../../sessionStorageItem/setSessionStorageItem';
import { ButtonForm } from '../../component/form/ButtonForm';

interface LoginData {
  username: String;
  password: String;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 'auto',
      width: '100%',
    },
    image: {
      backgroundImage: 'url(http://vps730378.ovh.net/upfiles/loginImage.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

export function Login() {
  const classes = useStyles()

  const initialLoginData: LoginData = {
    password: '',
    username: ''
  };

  const [loginData, setLoginData] = useState<LoginData>(
    initialLoginData
  );

  const { service, sendRequest } = requestService(initialLoginData, 'login');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setLoginData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRequest(loginData).then(() => setLoginData(initialLoginData));
    setSessionStorageItem('username', loginData.username.toString());
  };

  if (getSessionStorageItem('token')) {
    return (
      <InfoCard
        title={'Witaj ' + getSessionStorageItem('username') + '!'}
        content="Zostałeś poprawnie zalogowany do systemu! Aby zarządzać stroną przejdź do zakładki 'Panel administracyjny'. "
      />)
  }

  return (
    <div className={classes.root}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Logowanie
          </Typography>
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nazwa użytkownika"
                name="username"
                onChange={handleChange}
                value={loginData.username}
                autoComplete="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={handleChange}
                value={loginData.password}
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ButtonForm
                errorMessage="Wystąpił błąd serwera lub zostały podane błędne dane"
                successMessage="Zostałeś poprawnie zalogowany"
                textButton="Zaloguj się"
                service={service}
                fullWidth={true}
              />
            </form>
            {
              service.status === Status.LOADED &&
              setSessionStorageItem('token', service.payload.token)
            }
          </div>
        </Grid>
      </Grid>
    </div>
  )
}