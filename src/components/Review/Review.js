import React from 'react';
import { withRouter } from 'react-router-dom';

import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import classes from './Review.module.css';

const Review = (props) => {
	
	const reviewClickedHandler = () => {
		props.history.push({
			pathname: '/review-details/' + props.reviewId,
			state: {
				review: {
					reviewId: props.reviewId,
					title: props.title,
					body: props.body,
					creator: props.creator,
					videoGame: props.videoGame,
					videoGameId: props.videoGame._id,
					imageUrl: props.imageUrl,
					rating: props.rating
				}
			}
		});
	};
	
	return (
		<React.Fragment>
			<Card className={classes.Review}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.title}
					</Typography>
					<Typography gutterBottom variant="body1" color="textSecondary" component="p">
						By: {props.creator.username}
					</Typography>
					<Rating value={props.rating} readOnly />
					<Typography variant="body1" color="textSecondary" component="p">
						{props.videoGame.title}
					</Typography>
					<CardMedia className={classes.Image} image={props.videoGame.imageUrl} title={props.videoGame.title} />
					<Typography variant="body2" component="p">
						{props.bodyPreview}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={reviewClickedHandler}>Read More</Button>
				</CardActions>
			</Card>
		</React.Fragment>
	);
};

export default withRouter(Review);
