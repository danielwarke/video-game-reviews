import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Hidden,
	Grid
} from '@material-ui/core';

import {
	AccountBox as AccountBoxIcon,
	ExitToApp as ExitToAppIcon,
	VpnKey as VpnKeyIcon
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

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
		textAlign: 'center',
		margin: '0 auto'
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
	
	const userButtonHandler = () => {
		props.history.push('/user');
	};
	
	let authButton;
	
	const loginButton = <Button color="inherit" startIcon={<VpnKeyIcon />} onClick={loginButtonHandler}>Login</Button>;
	const logoutButton = <Button color="inherit" startIcon={<ExitToAppIcon />} onClick={logoutButtonHandler}>Logout</Button>;
	
	switch (authContext.loginButton) {
		case 'Login':
			authButton = loginButton;
			break;
		case 'Logout':
			authButton = logoutButton;
			break;
		case null:
			authButton = null;
			break;
		default:
			authButton = loginButton;
	}
	
	let userButton;
	
	if (authContext.token !== null && authContext.username) {
		userButton = <Button startIcon={<AccountBoxIcon />} color="inherit" onClick={userButtonHandler}>{authContext.username}</Button>;
	}
	
	return (
			<AppBar position="sticky">
				<Toolbar>
					<Grid justify="space-between" container spacing={10} alignItems="center">
						<Grid item>
							<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
								<Menu />
							</IconButton>
						</Grid>
						<Hidden smDown>
							<Grid item>
								<Typography variant="h6" className={classes.title}>
									Video Game Reviews
								</Typography>
							</Grid>
						</Hidden>
						<Grid item>
							{userButton}
							{authButton}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
	);
};

export default withRouter(Header);
