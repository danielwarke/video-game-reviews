import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Button,
	Container,
	Typography
} from '@material-ui/core';

import { AuthContext } from '../../context/auth-context';
import classes from './User.module.css';

const User = (props) => {
	const authContext = useContext(AuthContext);
	
	const userReviewsButtonHandler = () => {
		props.history.push('/reviews?user=' + authContext.userId);
	};
	
	return (
		<Container maxWidth="sm" className={classes.User}>
			<Typography gutterBottom variant="h3" component="h1">
				Account Details
			</Typography>
			<Typography gutterBottom variant="body1" component="p">
				Username: {authContext.username}
			</Typography>
			<Typography gutterBottom variant="body1" component="p">
				Email Address: {authContext.email}
			</Typography>
			<Button className={classes.Button} variant="contained" onClick={userReviewsButtonHandler}>My Reviews</Button>
		</Container>
	);
};

export default User;
