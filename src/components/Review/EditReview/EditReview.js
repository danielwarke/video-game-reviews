import React, { useState } from 'react';

import {
	Container,
	Button,
	CircularProgress,
	TextField,
	Typography
} from '@material-ui/core'

import {
	Save as SaveIcon
} from '@material-ui/icons';

import { Rating } from '@material-ui/lab';

import classes from './EditReview.module.css';

const EditReview = (props) => {
	const review = props.location.state ? props.location.state.review : {};
	
	const [loading, setLoading] = useState(false);
	const [rating, setRating] = useState(review.rating);
	
	const editReviewHandler = (event) => {
		event.preventDefault();
		
		setLoading(true);
		
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};
	
	const ratingChangedHandler = (newValue) => {
		setRating(newValue);
	};
	
	let button = <Button
		variant="contained"
		type="submit"
		color="primary"
		size="large"
		startIcon={<SaveIcon />}>
		Save
	</Button>;
	
	if (loading) {
		button = <CircularProgress />;
	}
	
	return (
		<Container maxWidth="sm" className={classes.EditReview}>
			<form onSubmit={editReviewHandler} className={classes.Form}>
				<Typography gutterBottom variant="h2" component="h1">{(review.reviewId ? 'Edit' : 'Write New') + ' Review'}</Typography>
				<TextField className={classes.Input} label="Title" defaultValue={review.title} fullWidth required />
				<Typography gutterBottom variant="body2" component="h5">
					Rating
				</Typography>
				<Rating value={rating} onChange={(event, newValue) => ratingChangedHandler(newValue)} />
				<TextField className={classes.Input} label="Body" defaultValue={review.body} fullWidth required multiline rowsMax={25} />
				{button}
			</form>
		</Container>
	);
};

export default EditReview;
