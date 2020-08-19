import React, { useState, useEffect, useContext, useCallback } from 'react';
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
import { AuthContext } from '../../context/auth-context';

const Reviews = (props) => {
	const isAuth = useContext(AuthContext).token !== null;
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [fetchedAllReviews, setFetchedAllReviews] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	const getReviews = () => {
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
		
		if (currentPage > 1) {
			url += '?page=' + currentPage;
		}
		
		axios.get(url).then(response => {
			const fetchedReviews = response.data.reviews;
			fetchedReviews.forEach(review => {
				review.reviewId = review._id;
			});
			
			let updatedReviews = [...reviews];
			setReviews(updatedReviews.concat(fetchedReviews));
			setLoading(false);
			setCurrentPage(currentPage + 1);
			if (reviews.length >= response.data.totalItems) {
				setFetchedAllReviews(true);
			}
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	const handleScroll = useCallback(() => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			if (loading) {
				return;
			}
			
			if (fetchedAllReviews) {
				return;
			}
			
			getReviews();
		}
	}, [currentPage, loading]);
	
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll]);
	
	useEffect(() => {
		getReviews();
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
		if (isAuth) {
			props.history.push('/review/create');
		} else {
			props.history.push('/auth');
		}
	};
	
	let reviewList;
	let noneFoundMessage;
	let writeNewReviewButton;
	
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
	
	writeNewReviewButton = (
		<Button
			className={classes.Center}
			variant="contained"
			color="secondary"
			onClick={writeNewReviewButtonHandler}>{isAuth ? 'Write New Review' : 'Login to Write a Review'}</Button>
	);
	
	return (
		<Container maxWidth="md" className={classes.Reviews}>
			{noneFoundMessage}
			{writeNewReviewButton}
			{reviewList}
			{loading && reviews.length ? <CircularProgress className={classes.Center} /> : null}
			<Alert
				open={alert.open}
				severity={alert.severity}
				message={alert.message}
				onClose={handleAlertClosed}  />
		</Container>
	);
};

export default withRouter(Reviews);
