import React from 'react';
import { Button, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Status } from '../../service/requestService';
import ActionSnackbar from '../snackbar/ActionSnackbar';
import clsx from 'clsx';

interface Props {
  service: any;
  successMessage: string;
  errorMessage: string;
  textButton: string;
  fullWidth?: boolean | null;
  onClick?: () => void;
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
    toRight: {
      float: "right",
    },
    fullWidth: {
      width: '100%',
    },
  }),
);

export function ButtonForm(props: Props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={clsx(classes.toRight, props.fullWidth?classes.fullWidth:null)}
        fullWidth={false}
        disabled={props.service.status === Status.LOADING}
        onClick={() => props.onClick}
      >
        {props.textButton}
        {props.service.status === Status.LOADING &&
          <CircularProgress size={24} color="secondary" className={classes.buttonProgress} />
        }
        {
          props.service.status === Status.LOADED &&
          <ActionSnackbar
            status={props.service.status}
            content={props.successMessage}
            variant="success"
          />
        }
        {
          props.service.status === Status.ERROR &&
          <ActionSnackbar
            status={props.service.status}
            content={props.errorMessage}
            variant="error"
          />
        }
      </Button>
    </div>
  )
}