import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '18px',
    height: '18px',
    backgroundColor: '#000',
    border: '2px solid #fff',
    borderRadius: '100%',
    userSelect: 'none',
    transform: 'translate(-50%, -50%)',
  }
});

export function Marker(props: any) {
  const classes = useStyles();

  return (
    <Fragment>
      <span style={{fontWeight: 'bold'}}>{props.name}</span>
      <div className={classes.marker}
        style={{ backgroundColor: 'red', cursor: 'pointer' }}
      />
    </Fragment>
  );
};