import React, { useEffect } from 'react';

import {Container} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import classes from './ReviewDetails.module.css';

const ReviewDetails = (props) => {
	useEffect(() => {
		console.log(props);
	}, []);
	
	const review = props.location.state.review;
	
	return (
		<Container maxWidth="md" className={classes.ReviewDetails}>
			<Typography gutterBottom variant="h2" component="h1">
				{review.title}
			</Typography>
			<Typography variant="body1" component="p">
				{review.body}
			</Typography>
		</Container>
	);
};

export default ReviewDetails;
