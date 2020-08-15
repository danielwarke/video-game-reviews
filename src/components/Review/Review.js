import React from 'react';
import { withRouter } from 'react-router-dom';

import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ReviewDetails from './ReviewDetails/ReviewDetails';
import classes from './Review.module.css';

const Review = (props) => {
	const reviewClickedHandler = () => {
		props.history.push({
			pathname: '/review-details/' + props.reviewId,
			state: {
				review: {
					id: props.reviewId,
					title: props.title,
					body: props.body
				}
			}
		});
	};
	
	return (
		<React.Fragment>
			<Card className={classes.Review} onClick={reviewClickedHandler}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.title}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{props.body}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</React.Fragment>
	);
};

export default withRouter(Review);
