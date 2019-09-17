import React, { Fragment } from 'react';
import { List, ListItemAvatar, Avatar, ListItemText, makeStyles, ListItem } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import Streetview from '@material-ui/icons/Streetview';
import Email from '@material-ui/icons/Email';
import ContactPhone from '@material-ui/icons/ContactPhone';
import { blue } from '@material-ui/core/colors';

export interface VariantIcon {
  itemText: String;
  variant: keyof typeof variantIcon;
}

export interface VariantIconArray {
  item: Array<VariantIcon>;
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  textWrap: {
    wordBreak: 'break-all'
  }
});

const variantIcon = {
  home: Home,
  streetview: Streetview,
  email: Email,
  contactphone: ContactPhone,
};

function convertPropsToIcon(props: VariantIcon) {
  const Icon = variantIcon[props.variant];
  return (
    <Icon />
  )
}

export function ContactInfoCard(data: VariantIconArray) {
  const classes = useStyles();

  return (
    <List>
      {
        data.item.map(item =>
          <ListItem key={item.variant}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {convertPropsToIcon(item)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className={classes.textWrap} 
              primary={item.itemText} />
          </ListItem>
        )
      }
    </List>
  )
}