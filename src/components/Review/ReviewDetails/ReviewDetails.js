import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Container,
	Typography,
	Button,
	Grid,
	Hidden
} from '@material-ui/core';

import { Rating } from '@material-ui/lab';

import classes from './ReviewDetails.module.css';
import { AuthContext } from '../../../context/auth-context';
import Comments from '../../../containers/Comments/Comments';

const ReviewDetails = (props) => {
	const review = props.location.state.review;
	
	const userId = useContext(AuthContext).userId;
	const [isCreator, setIsCreator] = useState(false);
	
	useEffect(() => {
		if (userId === review.creator._id) {
			setIsCreator(true);
		}
	}, [userId, review.creator._id]);
	
	const editReviewHandler = () => {
		props.history.push({
			pathname: '/review/' + review.reviewId + '/edit',
			state: { review: review }
		});
	};
	
	const userReviewsButtonHandler = () => {
		props.history.push('/reviews?user=' + review.creator._id);
	};
	
	let editButton = null;
	let userReviewsButton = null;
	
	if (isCreator) {
		editButton = (
			<Grid item>
				<Button variant="contained" onClick={editReviewHandler} color="secondary">
					Edit
				</Button>
			</Grid>
		);
	}
	
	if (!isCreator) {
		userReviewsButton = (
			<Grid item className={classes.UserButton}>
				<Button variant="contained" onClick={userReviewsButtonHandler}>
					More Reviews by {review.creator.username}
				</Button>
			</Grid>
		);
	}
	
	return (
		<Container maxWidth="md" className={classes.ReviewDetails}>
			<Grid container spacing={3} justify="space-between">
				<Grid item>
					<Hidden smDown>
						<Typography gutterBottom variant="h2" component="h1" className={classes.ReviewTitle}>
							{review.title}
						</Typography>
					</Hidden>
					<Hidden mdUp>
						<Typography gutterBottom variant="h4" component="h1" className={classes.ReviewTitle}>
							{review.title}
						</Typography>
					</Hidden>
					<Rating value={review.rating} readOnly size="large" />
					<Typography gutterBottom variant="subtitle1" component="h2">
						{review.videoGame.title}
					</Typography>
					<Typography gutterBottom variant="subtitle2" component="h3">
						Reviewed by {review.creator.username}
					</Typography>
				</Grid>
				{editButton}
			</Grid>
			<img src={review.videoGame.imageUrl} alt={review.videoGame.title} className={classes.Image} />
			<Typography variant="body1" className={classes.ReviewBody}>
				{review.body}
			</Typography>
			{userReviewsButton}
			<Comments reviewId={review.reviewId} />
		</Container>
	);
};

export default withRouter(ReviewDetails);
