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
import AccountCircle from '@material-ui/icons/AccountCircle';
import { IconMenuItem } from './IconMenuItem';
import { Footer } from './Footer';
import { Button } from '@material-ui/core';
import { LoginChecker } from '../../sessionStorageItem/LoginChecker';
import { getSessionStorageItem } from '../../sessionStorageItem/getSessionStorageItem';
import ActionSnackbar from '../snackbar/ActionSnackbar';
import { Status } from '../../service/requestService';

interface MenuItem {
  iconName: string;
  itemValue: string;
  path: string;
  permission: boolean;
}

interface Props {
  pageContent(): any;
}

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingTop: '100px',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingBottom: '100px'
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
    marginRight: '50px',
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

  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const checkLogin = LoginChecker('token');

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  function handleSnackbarShow() {
    setShowSnackbar(true)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
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
              <Button
                color="secondary"
                className={classes.floatRight}
                variant="contained"
                onClick={handleSnackbarShow}
              >
                <AccountCircle></AccountCircle>
              </Button> :
              <Button
                color="secondary"
                onClick={() => window.location.replace("/login")}
                className={classes.floatRight}
                variant="contained"
              >
                <LockClose></LockClose>
              </Button>
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
        {
          showSnackbar &&
          <ActionSnackbar
            status={Status.LOADED}
            content={"Jesteś zalogowany jako " + getSessionStorageItem('username')}
            variant="success"
          />
        }
      </Fragment>
    </div>
  )
}