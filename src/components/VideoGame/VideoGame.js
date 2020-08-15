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

import classes from './VideoGame.module.css';

const VideoGame = (props) => {
	const videoGameClickedHandler = () => {
		props.history.push('/');
	};
	
	return (
		<React.Fragment>
			<Card className={classes.VideoGame}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.title}
					</Typography>
					<Rating value={props.averageRating} readOnly />
					<CardMedia className={classes.Image} image={props.imageUrl} title={props.title} />
					<Typography variant="body1" color="textSecondary" component="p">
						{props.description}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={videoGameClickedHandler}>See Reviews</Button>
				</CardActions>
			</Card>
		</React.Fragment>
	);
};

export default withRouter(VideoGame);
