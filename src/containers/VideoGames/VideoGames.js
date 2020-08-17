import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Button,
	Container,
	Grid,
	Typography
} from '@material-ui/core';

import axios from '../../shared/axios';
import VideoGame from '../../components/VideoGame/VideoGame';
import classes from './VideoGames.module.css';
import { AuthContext } from '../../context/auth-context';
import { getErrorMessage } from '../../shared/utility';
import Alert from '../../components/UI/Alert/Alert';

const VideoGames = (props) => {
	const isAuth = useContext(AuthContext).token !== null;
	const [videoGames, setVideoGames] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	useEffect(() => {
		setLoading(true);
		
		axios.get('/video-games').then(response => {
			setLoading(false);
			
			const fetchedVideoGames = response.data.videoGames;
			fetchedVideoGames.forEach(videoGame => {
				videoGame.videoGameId = videoGame._id;
			});
			
			setVideoGames(fetchedVideoGames);
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	}, []);
	
	// {
	// 	videoGameId: 1,
	// 		title: 'Paper Mario: The Origami King',
	// 	description: 'A single player adventure game developer by Nintendo',
	// 	imageUrl: 'https://images.nintendolife.com/cfb927ec2c8d0/1280x720.jpg',
	// 	averageRating: 4
	// }
	
	const createButtonHandler = () => {
		props.history.push('/video-game/create');
	};
	
	let videoGameList;
	
	if (!videoGames.length) {
		videoGameList = (
			<Grid item xs={12}>
				<Typography gutterBottom variant="h5" component="h5">
					No Video Games found!
				</Typography>
			</Grid>
		);
	} else {
		videoGameList = videoGames.map((videoGame) => (
			<Grid item key={videoGame.videoGameId} xs={6}>
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
	
	if (!isAuth) {
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
