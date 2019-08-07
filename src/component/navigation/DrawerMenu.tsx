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
import { IconMenuItem } from './IconMenuItem';
import { Footer } from './Footer';

interface MenuItem {
  iconName: string;
  itemValue: string;
  path: string;
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
  }
}));

export function DrawerMenu(props: Props) {
  const classes = useStyles();
  const theme = useTheme();

  const menuItem: Array<MenuItem> = [
    {
      iconName: 'SupervisedUserCircle',
      itemValue: 'O nas',
      path: '/o-nas'
    },
    {
      iconName: 'LocalOffer',
      itemValue: 'Oferta',
      path: '/oferta'
    },
    {
      iconName: 'AttachMoney',
      itemValue: 'Cennik',
      path: '/cennik'
    },
    {
      iconName: 'PhotoCamera',
      itemValue: 'Galeria',
      path: '/galeria'
    },
    {
      iconName: 'Phone',
      itemValue: 'Kontakt',
      path: '/kontakt'
    }
  ]

  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
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
            <ListItem button key={item.itemValue} onClick={() => location.assign(item.path)}>
              <ListItemIcon >
                {
                  IconMenuItem(item.iconName)
                }
              </ListItemIcon>
              <ListItemText primary={item.itemValue} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Fragment>
        {
          props.pageContent
        }
        <Footer/>
      </Fragment>
    </div>
  )
}