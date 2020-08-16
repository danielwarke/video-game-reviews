import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Menu from '../Menu/Menu';
import { AuthContext } from '../../../context/auth-context';

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
	const authContext = useContext(AuthContext);
	
	const loginButtonHandler = () => {
		props.history.replace('/auth');
	};
	
	const logoutButtonHandler = () => {
		authContext.logout();
		props.history.replace('/');
	};
	
	let loginButton;
	
	switch (authContext.loginButton) {
		case 'Login':
			loginButton = <Button color="inherit" onClick={loginButtonHandler}>Login</Button>;
			break;
		case 'Logout':
			loginButton = <Button color="inherit" onClick={logoutButtonHandler}>Logout</Button>;
			break;
		case null:
			loginButton = null;
			break;
		default:
			loginButton = <Button color="inherit" onClick={loginButtonHandler}>Login</Button>;
	}
	
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
