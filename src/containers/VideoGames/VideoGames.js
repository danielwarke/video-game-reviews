import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Button,
	Container,
	Grid,
	Typography
} from '@material-ui/core';

import VideoGame from '../../components/VideoGame/VideoGame';
import classes from './VideoGames.module.css';
import { AuthContext } from '../../context/auth-context';
import { VideoGameContext } from '../../context/video-game-context';
import Alert from '../../components/UI/Alert/Alert';

const VideoGames = (props) => {
	const videoGameContext = useContext(VideoGameContext);
	const isAdmin = useContext(AuthContext).isAdmin;
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	useEffect(() => {
		videoGameContext.getVideoGames();
	}, []);
	
	const createButtonHandler = () => {
		props.history.push('/video-game/create');
	};
	
	let videoGameList;
	
	if (!videoGameContext.videoGames.length) {
		videoGameList = (
			<Grid item xs={12}>
				<Typography gutterBottom variant="h5" component="h5">
					No Video Games found!
				</Typography>
			</Grid>
		);
	} else {
		videoGameList = videoGameContext.videoGames.map((videoGame) => (
			<Grid item key={videoGame.videoGameId} xs={12} md={6}>
				<VideoGame {...videoGame} />
			</Grid>
		));
	}
	
	let createButton = (
		<Grid item>
			<Button variant="contained" onClick={createButtonHandler}>
				Add New
			</Button>
		</Grid>
	);
	
	if (!isAdmin) {
		createButton = null;
	}
	
	const handleAlertClosed = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		
		setAlert({
			...alert,
			open: false
		});
	};
	
	return (
		<Container maxWidth="md" className={classes.VideoGames}>
			<Grid container spacing={3} justify="space-between">
				<Grid item>
					<Typography gutterBottom variant="h2" component="h1">
						Video Games
					</Typography>
				</Grid>
				{createButton}
			</Grid>
			<Grid container spacing={3} justify="space-between">
				{videoGameList}
				<Alert
					open={alert.open}
					severity={alert.severity}
					message={alert.message}
					onClose={handleAlertClosed}  />
			</Grid>
		</Container>
	);
};

export default withRouter(VideoGames);
