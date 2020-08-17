import React, { useContext } from 'react';
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
import { AuthContext } from '../../context/auth-context';

const VideoGame = (props) => {
	const isAdmin = useContext(AuthContext).isAdmin;
	
	const videoGameClickedHandler = () => {
		props.history.push('/reviews?videoGame=' + props.videoGameId);
	};
	
	const editButtonHandler = () => {
		props.history.push({
			pathname: '/video-game/' + props.videoGameId + '/edit',
			state: {
				videoGame: {
					videoGameId: props.videoGameId,
					title: props.title,
					description: props.description,
					imageUrl: props.imageUrl
				}
			}
		});
	};
	
	const editButton = isAdmin ? <Button size="small" onClick={editButtonHandler}>Edit</Button> : null;
	
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
					{editButton}
				</CardActions>
			</Card>
		</React.Fragment>
	);
};

export default withRouter(VideoGame);
