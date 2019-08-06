import React from 'react';
import { makeStyles, Theme, createStyles, Grid, BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { Facebook, Gmail, GoogleMaps } from 'mdi-material-ui';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerFixed: {
      position: 'fixed',
      left: '0',
      bottom: '0',
      width: '100%',
      backgroundColor: '#3F51B5',
      color: 'white',
      textAlign: 'center',
      height: '60px'
    },
    navigationBottomBgColor: {
      backgroundColor: '#3F51B5'
    },
    itemNavigationBottomBgColor: {
      backgroundColor: 'white'
    },
    labelColor: {
      color: 'white'
    },
    centerVertical: {
      margin: 'auto'
    }
  }));

export function Footer() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  return (
    <div className={classes.footerFixed}>
      <Grid container spacing={3}>
        <Grid item xs={6} className={classes.centerVertical}>
          © 2019, #PierogarniaJeżowe, All rights reserved
        </Grid>
        <Grid item xs={6}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.navigationBottomBgColor}
          >
            <BottomNavigationAction
              className={classes.labelColor}
              label="Facebook"
              icon={<Facebook className={classes.labelColor} />} 
              onClick={() => location.assign('https://www.facebook.com/pierogarniajezowe')} />
            <BottomNavigationAction
              className={classes.labelColor}
              label="Gmail"
              icon={<Gmail className={classes.labelColor} />} 
              onClick={() => location.assign('mailto:pierogarniajezowe@gmail.com')} />
            <BottomNavigationAction
              className={classes.labelColor}
              label="GoogleMaps"
              icon={<GoogleMaps className={classes.labelColor} />} 
              onClick={() => location.assign('https://www.google.com/maps/place/Pierogarnia/@50.3744918,22.1570696,15z/data=!4m2!3m1!1s0x0:0xd01d2d1cd8b42d59?sa=X&ved=2ahUKEwi6w_nFvu7jAhVhs4sKHbDFDI0Q_BIwCnoECA8QCA')} />              />
          </BottomNavigation>
        </Grid>
      </Grid>
    </div>
  )
}