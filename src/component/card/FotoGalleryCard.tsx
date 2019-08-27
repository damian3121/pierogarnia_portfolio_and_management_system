import React from 'react';
import { makeStyles, GridList, GridListTile, ListSubheader, GridListTileBar } from '@material-ui/core';
import { ImageShowDialog } from '../dialog/ImageShowDialog';

export interface FotoGalleryCardProps {
  img?: string;
  title?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    minWidth: '50%',
  },
  gridList: {
    maxWidth: 900,
    padding: 20
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export function FotoGalleryCard(props: Array<FotoGalleryCardProps>) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Produkty</ListSubheader>
        </GridListTile>
        {props.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              actionIcon={
                ImageShowDialog(tile.img, tile.title)
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}