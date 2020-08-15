import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Menu from '../Menu/Menu';

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
	
	const navButtonClickedHandler = (url) => {
		props.history.replace(url);
	};
	
	return (
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Video Game Reviews
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
	);
};

export default withRouter(Header);
