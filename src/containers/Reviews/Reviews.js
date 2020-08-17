import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Container,
	Typography,
	CircularProgress,
	Button
} from '@material-ui/core';

import * as queryString from 'query-string';

import axios from '../../shared/axios';
import Review from '../../components/Review/Review';
import { getErrorMessage } from '../../shared/utility';
import Alert from '../../components/UI/Alert/Alert';
import classes from './Reviews.module.css';

const Reviews = (props) => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	useEffect(() => {
		setLoading(true);
		
		let url = '/reviews';
		
		if (props.history.location && props.history.location.search) {
			const params = queryString.parse(props.history.location.search);
			if (params.videoGame) {
				url = '/video-games/' + params.videoGame + '/reviews';
			} else if (params.user) {
				url = 'user/reviews/' + params.user;
			}
		}
		
		axios.get(url).then(response => {
			const fetchedReviews = response.data.reviews;
			fetchedReviews.forEach(review => {
				review.reviewId = review._id;
			});
			
			setReviews(fetchedReviews);
			setLoading(false);
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	}, [props.history.location]);
	
	const handleAlertClosed = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		
		setAlert({
			...alert,
			open: false
		});
	};
	
	const writeNewReviewButtonHandler = () => {
		props.history.push('/review/create');
	};
	
	let reviewList;
	let noneFoundMessage = null;
	
	if (!reviews.length) {
		if (loading) {
			reviewList = <CircularProgress className={classes.Center} />;
		} else {
			noneFoundMessage = (
				<Typography gutterBottom variant="h4" component="h4" className={classes.Center}>
					No Reviews found!
				</Typography>
			);
		}
	} else {
		reviewList = reviews.map(review => (
			<Review key={review.reviewId} {...review} />
		));
	}
	
	return (
		<Container maxWidth="sm" className={classes.Reviews}>
			{noneFoundMessage}
			<Button
				className={classes.Center}
				variant="contained"
				color="secondary"
				onClick={writeNewReviewButtonHandler}>Write New Review</Button>
			{reviewList}
			<Alert
				open={alert.open}
				severity={alert.severity}
				message={alert.message}
				onClose={handleAlertClosed}  />
		</Container>
	);
};

export default withRouter(Reviews);
