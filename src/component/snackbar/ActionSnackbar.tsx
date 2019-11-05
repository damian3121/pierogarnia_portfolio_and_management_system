import React, { useState, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { green, red } from '@material-ui/core/colors';
import { SnackbarContent } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Status } from '../../service/requestService';

export interface ActionSnackbarI {
  content: string;
  variant: keyof typeof variantIcon;
  status?: Status;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
    successBgColor: {
      backgroundColor: green[500],
    },
    bgColor: {
      backgroundColor: 'default'
    },
    errorBgColor: {
      backgroundColor: red[500],
    },
    icon: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    content: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export default function ActionSnackbar(props: ActionSnackbarI) {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const Icon = variantIcon[props.variant];

  function handleClose(event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <SnackbarContent
          className={props.status === Status.ERROR ?
            classes.errorBgColor : props.status === Status.LOADED
              ? classes.successBgColor : classes.bgColor}
          message={
            <span className={classes.content} id="message-id">
              <Icon className={classes.icon} />
              {props.content}
            </span>
          }
        >
        </SnackbarContent>
      </Snackbar>
    </div>
  );
}