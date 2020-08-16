import React, { useReducer, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Menu from '../Menu/Menu';
import authReducer from '../../../store/reducers/auth';
import * as authActions from '../../../store/actions/auth';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		textAlign: 'center'
	}
}));

const Header = (props) => {
	const classes = useStyles();
	const [state, dispatch] = useReducer(authReducer, {
		token: null,
		userId: null,
		loginButton: 'Login'
	});
	
	const loginButtonValue = useReducer(authReducer)[0].loginButton;
	
	const loginButtonHandler = () => {
		props.history.replace('/auth');
	};
	
	const logoutButtonHandler = () => {
		dispatch(authActions.authLogout());
		props.history.replace('/');
	};
	
	let loginButton;
	
	useEffect(() => {
		console.log('STATE CHANGED', loginButtonValue);
		
		switch (loginButtonValue) {
			case 'Login':
				loginButton = <Button color="inherit" onClick={loginButtonHandler}>Login</Button>;
				break;
			case 'Logout':
				loginButton = <Button color="inherit" onClick={logoutButtonHandler}>Login</Button>;
				break;
			case null:
				loginButton = null;
				break;
			default:
				loginButton = <Button color="inherit" onClick={loginButtonHandler}>Login</Button>;
		}
	}, [loginButtonValue]);
	
	return (
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Video Game Reviews
					</Typography>
					{loginButton}
				</Toolbar>
			</AppBar>
	);
};

export default withRouter(Header);
