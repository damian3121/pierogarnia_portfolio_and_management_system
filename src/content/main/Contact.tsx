import React from 'react';
import { makeStyles, Theme, createStyles, Paper, Typography, Grid } from '@material-ui/core';
import { MailSenderForm } from './MailSenderForm';
import { ContactInfoCard, VariantIcon, VariantIconArray } from '../../component/card/ContactInfoCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      height: '100%',
    },
    center: {
      margin: '0 auto',
      width: '100%',
    }
  }),
);

const variantIcon: VariantIconArray = {
  item: [
    {
      itemText: "Pierogarnia Jeżowe",
      variant: "home"
    },
    {
      itemText: "Jeżowe 237, 37-430 Jeżowe (obok poczty)",
      variant: "streetview"
    },
    {
      itemText: "+48 889-425-312",
      variant: "contactphone"
    },
    {
      itemText: "pierogarniajezowe@gmail.com",
      variant: "email"
    }
  ]
}

export function Contact() {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.root}>
            <Typography variant="h6" component="h3">
              Formularz kontaktowy
            </Typography>
            <MailSenderForm />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.root}>
            <Typography variant="h6" component="h3">
              Kontakt
            </Typography>
            <ContactInfoCard
              item={variantIcon.item}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.root}>
            <Typography variant="h6" component="h3">
              Mapa dojazdu
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}