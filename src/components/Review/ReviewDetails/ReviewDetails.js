import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Container,
	Typography,
	Button,
	Grid
} from '@material-ui/core';

import { Rating } from '@material-ui/lab';

import classes from './ReviewDetails.module.css';

const ReviewDetails = (props) => {
	const review = props.location.state.review;
	
	useEffect(() => {
		console.log(review);
	}, []);
	
	const editReviewHandler = () => {
		props.history.push({
			pathname: '/review/' + review.reviewId + '/edit',
			state: { review: review }
		});
	};
	
	return (
		<Container maxWidth="md" className={classes.ReviewDetails}>
			<Grid container spacing={3} justify="space-between">
				<Grid item>
					<Typography gutterBottom variant="h2" component="h1">
						{review.title}
					</Typography>
					<Rating value={review.rating} readOnly size="large" />
				</Grid>
				<Grid item>
					<Button variant="contained" onClick={editReviewHandler}>
						Edit
					</Button>
				</Grid>
			</Grid>
			<img src={review.videoGame.imageUrl} alt={review.videoGame.title} className={classes.Image} />
			<Typography gutterBottom variant="body2" component="h5">
				By: {review.creator.username}
			</Typography>
			<Typography variant="body1" component="p">
				{review.body}
			</Typography>
		</Container>
	);
};

export default withRouter(ReviewDetails);
