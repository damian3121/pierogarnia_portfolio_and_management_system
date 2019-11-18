import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockClose from '@material-ui/icons/Lock';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import { IconMenuItem } from './IconMenuItem';
import { Footer } from './Footer';
import { Fab, Menu, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { LoginChecker } from '../../sessionStorageItem/LoginChecker';
import Edit from '@material-ui/icons/Edit';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import { ButtonForm } from '../form/FormButton';
import { requestService } from '../../service/postRequestSender';
import { Status } from '../../service/requestService';

interface MenuItem {
  iconName: string;
  itemValue: string;
  path: string;
  permission: boolean;
}

interface PasswordChange {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

interface Props {
  pageContent(): any;
}

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingTop: '100px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '100px',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  floatRight: {
    position: 'absolute',
    right: '0px',
    marginRight: '15px',
  },
  toolbarPadding: {
    paddingRight: '10px',
    paddingLeft: '10px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export function DrawerMenu(props: Props) {
  const classes = useStyles();
  const theme = useTheme();

  const menuItem: Array<MenuItem> = [
    {
      iconName: 'Home',
      itemValue: 'Strona główna',
      path: '/',
      permission: true,
    },
    {
      iconName: 'SupervisedUserCircle',
      itemValue: 'O nas',
      path: '/o-nas',
      permission: true,
    },
    {
      iconName: 'LocalOffer',
      itemValue: 'Oferta',
      path: '/oferta',
      permission: true,
    },
    {
      iconName: 'AttachMoney',
      itemValue: 'Cennik',
      path: '/cennik',
      permission: true,
    },
    {
      iconName: 'PhotoCamera',
      itemValue: 'Galeria',
      path: '/galeria',
      permission: true,
    },
    {
      iconName: 'Phone',
      itemValue: 'Kontakt',
      path: '/kontakt',
      permission: true,
    },
    {
      iconName: 'Login',
      itemValue: 'Panel administracyjny',
      path: '/admin',
      permission: LoginChecker('token'),
    }
  ]

  const initialPasswordChange: PasswordChange = {
    newPassword: '',
    oldPassword: '',
    repeatNewPassword: '',
  };

  const [passwordChange, setPasswordChange] = useState<PasswordChange>(
    initialPasswordChange
  );

  const { service, sendRequest } = requestService(initialPasswordChange, 'http://www.pierogarniajezowe.pl:8080/api/save-password');

  const [open, setOpen] = useState(false);
  const checkLogin = LoginChecker('token');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openBarMenu = Boolean(anchorEl);
  const [openChangePasswordModal, setOpenChangePasswordModal] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  const logout = () => {
    location.assign("/login")
    sessionStorage.clear();
    setAnchorEl(null);
  }

  const handleCloseBarMenu = () => {
    setAnchorEl(null);
  };

  const handleBarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickChangePasswordModalOpen = () => {
    setAnchorEl(null);
    setPasswordChange(initialPasswordChange)
    service.status = Status.INIT
    setOpenChangePasswordModal(true);
  };
  const handleChangePasswordModalClose = () => {
    setAnchorEl(null);
    setOpenChangePasswordModal(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setPasswordChange(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRequest(passwordChange)
      .then(() => setPasswordChange(initialPasswordChange))
  };

  console.log(service.status)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar className={classes.toolbarPadding}>
          <IconButton
            color='inherit'
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Pierogarnia Jeżowe
          </Typography>
          {
            checkLogin ?
              <Fragment>
                <Fab
                  color="secondary"
                  className={classes.floatRight}
                  size='small'
                  onClick={handleBarMenu}
                >
                  <ConfirmationNumber />
                </Fab>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openBarMenu}
                  onClose={handleCloseBarMenu}
                >
                  <MenuItem onClick={handleClickChangePasswordModalOpen}>
                    <IconButton
                      color="inherit"
                    >
                      <Edit />
                    </IconButton>
                    Edytuj swoje dane
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <IconButton
                      color="inherit"
                    >
                      <ExitToApp />
                    </IconButton>
                    Wyloguj się
                  </MenuItem>
                </Menu>
              </Fragment> :
              <Fab
                color="secondary"
                onClick={() => window.location.replace("/login")}
                className={classes.floatRight}
                size='small'
              >
                <LockClose />
              </Fab>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItem.map((item) => (
            item.permission ?
              <ListItem button key={item.itemValue} onClick={() => location.assign(item.path)}>
                <ListItemIcon >
                  {
                    IconMenuItem(item.iconName)
                  }
                </ListItemIcon>
                <ListItemText primary={item.itemValue} />
              </ListItem> : null
          ))}
        </List>
      </Drawer>
      <Fragment>
        {
          props.pageContent
        }
        <Footer />
      </Fragment>
      <div>
        <Dialog onClose={handleChangePasswordModalClose} open={openChangePasswordModal}>
          <DialogTitle>Zmień hasło</DialogTitle>
          <DialogContent dividers>
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Stare hasło"
                name="oldPassword"
                onChange={handleChange}
                value={passwordChange.oldPassword}
                type="password"
              />
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                onChange={handleChange}
                value={passwordChange.newPassword}
                label="Wpisz nowe hasło"
                type="password"
              />
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="repeatNewPassword"
                onChange={handleChange}
                value={passwordChange.repeatNewPassword}
                label="Powtórz nowe hasło"
                type="password"
              />
              <ButtonForm
                errorMessage="Błędnie podane stare hasło lub nowe hasła się nie zgadzają"
                successMessage="Hasło zostało zmienione"
                textButton="Zmień hasło"
                service={service}
              />
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}