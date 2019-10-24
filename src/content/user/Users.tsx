import React, { useState } from 'react';
import {
  makeStyles, Theme, createStyles, Grid, Button,
  Typography, Avatar, CssBaseline, TextField, CircularProgress
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import { requestService } from '../../service/getRequestSender';
import { Status } from '../../service/requestService';

interface UserData {
  id: number;
  username: String;
  password: String;
  jwtToken: String;
  dateTime: String;
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

export function Users() {
  const classes = useStyles()

  const initialUserData: UserData = {
    id: 0,
    password: '',
    username: '',
    dateTime: '',
    jwtToken: ''
  };

  const [userData, setUserData] = useState<UserData>(
    initialUserData
  );

  const { service, sendRequest } = requestService(initialUserData, 'http://localhost:8081/users');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setUserData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRequest(userData).then(() => setUserData(initialUserData));
  };

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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={service.status === Status.LOADING}
                className={classes.submit}
              >
                WYŚLIJ
                {service.status === Status.LOADING &&
                  <CircularProgress size={24} color="secondary" />
                  && console.log(sessionStorage.getItem('token'))
                }
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}