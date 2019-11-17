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
import { Fab, Menu } from '@material-ui/core';
import { LoginChecker } from '../../sessionStorageItem/LoginChecker';
import Edit from '@material-ui/icons/Edit';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import { setSessionStorageItem } from '../../sessionStorageItem/setSessionStorageItem';

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
  }
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
  const checkLogin = LoginChecker('token');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openBarMenu = Boolean(anchorEl);

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
                  <MenuItem onClick={handleCloseBarMenu}>
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
    </div>
  )
}