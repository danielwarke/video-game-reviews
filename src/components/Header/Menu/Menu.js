import React, { useState } from 'react';
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
	Menu as MenuIcon
} from '@material-ui/icons';

const Menu = (props) => {
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
	
	const menuOptions = [];
	
	menuOptions.push({
		icon: <Stars />,
		text: 'New Reviews',
		path: '/'
	});
	
	const list = menuOptions.map((menuOption, i) => (
		<ListItem button key={i} onClick={() => menuItemClickedHandler(menuOption.path)}>
			<ListItemIcon>{menuOption.icon}</ListItemIcon>
			<ListItemText primary={menuOption.text} />
		</ListItem>
	));
	
	return (
		<React.Fragment>
			<MenuIcon onClick={toggleMenuOpen} />
			<Drawer anchor="left" open={menuOpen} onClose={toggleMenuOpen}>
				<List>
					{list}
				</List>
			</Drawer>
		</React.Fragment>
	);
};

export default withRouter(Menu);
