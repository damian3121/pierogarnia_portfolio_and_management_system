import React, { Fragment } from 'react';
import { TransitionProps } from '@material-ui/core/transitions';
import { Slide, Dialog, DialogActions, Button, IconButton, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  centerImage: {
    margin: '0 auto',
    padding: '5px',
    height: 'auto',
    width: '70%'
  },
  responsiveImg: {
  }
}));

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function ImageShowDialog(imageUrl?: string, imageName?: string) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  return (
    <Fragment>
      <IconButton className={classes.icon} onClick={handleOpen}>
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullScreen={true}
      >
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zamknij
            <Close />
          </Button>
        </DialogActions>
        <img className={classes.centerImage} src={imageUrl} />
      </Dialog>
    </Fragment>
  )
}