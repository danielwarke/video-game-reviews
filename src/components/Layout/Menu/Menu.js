import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider
} from '@material-ui/core';

import {
	Stars,
	VideogameAsset,
	Menu as MenuIcon,
	Create as CreateIcon
} from '@material-ui/icons';

import classes from './Menu.module.css';
import { AuthContext } from '../../../context/auth-context';

const Menu = (props) => {
	const isAuth = useContext(AuthContext).token !== null;
	const [menuOpen, setMenuOpen] = useState(false);
	
	const toggleMenuOpen = (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		
		setMenuOpen(!menuOpen);
	};
	
	const menuItemClickedHandler = (path) => {
		setMenuOpen(false);
		props.history.push(path);
	};
	
	const menuOptions = [
		{
			icon: <Stars />,
			text: 'Reviews',
			path: '/'
		},
		{
			icon: <VideogameAsset />,
			text: 'Video Games',
			path: '/video-games'
		}
	];
	
	if (isAuth) {
		menuOptions.push({
			type: 'divider'
		});
		
		
		menuOptions.push({
			icon: <CreateIcon />,
			text: 'Write New Review',
			path: '/review/create'
		});
	}
	
	const list = menuOptions.map((menuOption, i) => {
		if (menuOption.type === 'divider') {
			return <Divider key={i} />;
		} else {
			return (
				<ListItem button key={i} onClick={() => menuItemClickedHandler(menuOption.path)}>
					<ListItemIcon>{menuOption.icon}</ListItemIcon>
					<ListItemText primary={menuOption.text} />
				</ListItem>
			);
		}
	});
	
	return (
		<React.Fragment>
			<MenuIcon onClick={toggleMenuOpen} />
			<Drawer anchor="left" open={menuOpen} onClose={toggleMenuOpen}>
				<List className={classes.List}>
					{list}
				</List>
			</Drawer>
		</React.Fragment>
	);
};

export default withRouter(Menu);
