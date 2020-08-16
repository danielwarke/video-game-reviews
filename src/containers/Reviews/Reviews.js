import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import axios from '../../shared/axios';
import Review from '../../components/Review/Review';

const Reviews = () => {
	const testReview = {
		reviewId: 3,
		title: 'I really enjoyed it!',
		body: 'One of the most memorable Paper Mario experiences to date.',
		imageUrl: 'https://images.nintendolife.com/cfb927ec2c8d0/1280x720.jpg',
		rating: 4,
		creator: 'Daniel Warke',
		videoGame: 'Paper Mario: The Origami King'
	};
	
	testReview.body = testReview.body + 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
		'\n' +
		'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.';
	
	const [loading, setLoading] = useState(false);
	const [reviews, setReviews] = useState([testReview]);
	
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
