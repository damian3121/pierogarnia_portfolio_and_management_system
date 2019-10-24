import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { Login } from './Login';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

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

	if (!sessionStorage.getItem('token')) {
		return (
			<Route exac path={props.path} component={() => props.pageContent()} />
		)
	} else {
		return (
			<div className={classes.container}>
				hej gówniaki xD
			</div>
		)
	}
}