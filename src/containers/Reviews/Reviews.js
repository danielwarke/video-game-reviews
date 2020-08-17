import React, { useState, useEffect } from 'react';
import {Container, Typography} from '@material-ui/core';
import * as queryString from 'query-string';

import axios from '../../shared/axios';
import Review from '../../components/Review/Review';
import { getErrorMessage } from '../../shared/utility';
import Alert from '../../components/UI/Alert/Alert';

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
	
	let reviewList;
	
	if (!reviews.length) {
		reviewList = (
			<Typography gutterBottom variant="h4" component="h4" style={{ margin: '20px 0' }}>
				No Reviews found!
			</Typography>
		);
	} else {
		reviewList = reviews.map(review => (
			<Review key={review.reviewId} {...review} />
		));
	}
	
	return (
		<Container maxWidth="sm">
			{reviewList}
			<Alert
				open={alert.open}
				severity={alert.severity}
				message={alert.message}
				onClose={handleAlertClosed}  />
		</Container>
	);
};

export default Reviews;
