import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfoCard from '../../component/card/InfoCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 'auto',
      width: '50%'
    }
  }),
);

export function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InfoCard
            title="Jakość"
            content="Produkcja wyrobów garmażeryjnych powstała w 2018r. 
            Tworzymy nowoczesny zakład pasjonujący się swojskimi wyrobami. 
            Zakład jest nowoczesny, zbudowany od podstaw. 
            Zakupione zostały maszyny spełniające wszelkie wymogi sanitarne 
            oraz opierające się na najnowocześniejszych technologiach."
            imageHeight={250}
            imageTrack="https://imageshack.com/i/pnQnNdLOj"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoCard
            title="Gwarancja smaku"
            content="Gotowanie to nasza pasja! Wyroby przygotowywane są ze świeżych składników o możliwie najwyższej jakości. 
            Korzystamy ze sprawdzonych receptur przekazywanych z pokolenia na pokolenie oraz dodając nutkę własnej twórczości 
            coby nasz produkt smakował jak najlepiej."
            imageHeight={250}
            imageTrack="https://imageshack.com/i/pma6PGSCj"
          />
        </Grid>
      </Grid>
    </div>
  );
}