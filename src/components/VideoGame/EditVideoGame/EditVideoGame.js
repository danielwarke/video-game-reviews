import React, { useState } from 'react';

import {
	Container,
	Button,
	CircularProgress,
	TextField,
	Typography
} from '@material-ui/core'

import {
	Save as SaveIcon
} from '@material-ui/icons';

import axios from '../../../shared/axios';
import classes from './EditVideoGame.module.css';

const EditVideoGame = (props) => {
	const videoGame = props.location.state ? props.location.state.videoGame : {};
	
	const [loading, setLoading] = useState(false);
	
	const editVideoGameHandler = (event) => {
		event.preventDefault();
		
		setLoading(true);
		
		axios.post('/video-games');
		
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};
	
	let button = <Button
		variant="contained"
		type="submit"
		color="primary"
		size="large"
		startIcon={<SaveIcon />}>
		Save
	</Button>;
	
	if (loading) {
		button = <CircularProgress />;
	}
	
	return (
		<Container maxWidth="sm" className={classes.EditVideoGame}>
			<form onSubmit={editVideoGameHandler} className={classes.Form}>
				<Typography gutterBottom variant="h2" component="h1">{(videoGame.videoGameId ? 'Edit' : 'Create') + ' Video Game'}</Typography>
				<TextField className={classes.Input} label="Title" defaultValue={videoGame.title} fullWidth required />
				<TextField className={classes.Input} label="Image Url" defaultValue={videoGame.imageUrl} fullWidth required />
				<TextField className={classes.Input} label="Description" defaultValue={videoGame.description} fullWidth required multiline rowsMax={10} />
				{button}
			</form>
		</Container>
	);
};

export default EditVideoGame;
