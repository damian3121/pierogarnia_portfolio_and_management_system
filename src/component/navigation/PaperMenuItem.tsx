import React from 'react';
import { makeStyles, createStyles, Grid, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    feed: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    feedItem: {
      padding: '30px',
      maxWidth: '100%',
      margin: '10px'
    },
    buttons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      fontWeight: "bold",
    }
  }),
);

interface Props {
  paperSectionHeader: string;
  buttonMenuData: Array<MenuButtonData>
}

interface MenuButtonData {
  buttonText: string;
  redirectUrl: string;
}

export function PaperMenuItem(props: Props) {
  const classes = useStyles()

  return (
    <Grid xs={12} item={true}>
      <Paper
        className={classes.feedItem}
      >
        <h2>{props.paperSectionHeader}</h2>

        <div className={classes.buttons}>
          <Grid container spacing={3}>
            {props.buttonMenuData.map(it =>
              <Grid item xs={6} key={it.redirectUrl}>
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="secondary"
                  onClick={() => location.assign(it.redirectUrl)}
                >
                  {it.buttonText}
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      </Paper>
    </Grid>
  )
}