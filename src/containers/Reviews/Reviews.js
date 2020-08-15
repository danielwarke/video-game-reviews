import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import axios from '../../shared/axios';
import Review from '../../components/Review/Review';

const Reviews = () => {
	const [loading, setLoading] = useState(false);
	const [reviews, setReviews] = useState([
		{
			id: 3,
			title: 'Testing',
			body: 'We dont know who we are',
			rating: 3,
			creator: 'Daniel Warke'
		}
	]);
	
	useEffect(() => {
		// setLoading(true);
		//
		// axios.get('/reviews').then(response => {
		// 	console.log(response);
		// 	setLoading(false);
		// }).catch(err => {
		// 	setLoading(false);
		// });
	}, []);
	
	return (
		<Container maxWidth="md">
			{reviews.map((review, i) => (
				<Review key={i}
			        reviewId={review.id}
					title={review.title}
			        body={review.body}
			        creator={review.creator} />
			))}
		</Container>
	);
};

export default Reviews;
