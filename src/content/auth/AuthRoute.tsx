import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Login } from './Login';
import { getSessionStorageItem } from '../../sessionStorageItem/getSessionStorageItem';

interface Props {
	pageContent(): any;
	path: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			width: '90%',
		}
	}),
);

export function AuthRoute(props: Props) {
	const classes = useStyles()

	if (!getSessionStorageItem('token')) {
		return (
			<Router>
				<Route exact path="/private" render={() => Login} />
			</Router>
		)
	} else {
		return (
			<div className={classes.container}>
				hej gówniaki xD
			</div>
		)
	}
}