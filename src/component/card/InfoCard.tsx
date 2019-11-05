import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';

interface Props {
  title: string;
  content: any;
  imageHeight?: number;
  imageTrack?: string;
  redirectAfterAction?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
    },
    centerHorizontal: {
      margin: 'auto',
      width: '100%',
      maxWidth: 'fit-content'
    },
    contentHeight: {
      minHeight: '120px'
    },
    borderTop: {
      borderTop: '1px solid darkgray'
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    }
  }));

export default function InfoCard(props: Props) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, classes.centerHorizontal)}>
      <CardActionArea>
        {
          props.imageTrack &&
          <CardMedia
            component="img"
            alt="None"
            height={props.imageHeight}
            image={props.imageTrack}
          />
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.contentHeight} variant="body2" color="textSecondary" component="p">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      {
        props.redirectAfterAction ?
          <CardActions className={classes.borderTop}>
            <Button variant="contained" color="primary" onClick={() => location.assign(props.redirectAfterAction ? props.redirectAfterAction : "")}>
              Więcej
                <MoreIcon className={classes.rightIcon} />
            </Button>
          </CardActions>
          : null
      }
    </Card>
  );
}