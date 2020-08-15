import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import axios from '../../shared/axios';
import Review from '../../components/Review/Review';

const Reviews = () => {
	const [loading, setLoading] = useState(false);
	const [reviews, setReviews] = useState([
		{
			reviewId: 3,
			title: 'I really enjoyed it!',
			body: 'One of the most memorable Paper Mario experiences to date.',
			imageUrl: 'https://images.nintendolife.com/cfb927ec2c8d0/1280x720.jpg',
			rating: 4,
			creator: 'Daniel Warke',
			videoGame: 'Paper Mario: The Origami King'
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
	
	const reviewList = reviews.map((review, i) => (
		<Review key={i} {...review} />
	));
	
	return (
		<Container maxWidth="sm">
			{reviewList}
		</Container>
	);
};

export default Reviews;
