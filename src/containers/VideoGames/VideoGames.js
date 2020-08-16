import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import {Button, Container, Grid, Typography} from '@material-ui/core';

import axios from '../../shared/axios';
import VideoGame from '../../components/VideoGame/VideoGame';
import classes from './VideoGames.module.css';

const VideoGames = (props) => {
	const [isAuth, setIsAuth] = useState(true);
	
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuth(true);
		}
	}, []);
	
	const [videoGames, setVideoGames] = useState([
		{
			videoGameId: 1,
			title: 'Paper Mario: The Origami King',
			description: 'A single player adventure game developer by Nintendo',
			imageUrl: 'https://images.nintendolife.com/cfb927ec2c8d0/1280x720.jpg',
			averageRating: 4
		}
	]);
	
	const createButtonHandler = () => {
		props.history.push('/video-game/create');
	};
	
	const videoGameList = videoGames.map((videoGame, i) => (
		<Grid item key={i} xs={6}>
			<VideoGame {...videoGame} />
		</Grid>
	));
	
	let createButton = (
		<Grid item>
			<Button variant="contained" onClick={createButtonHandler}>
				Create
			</Button>
		</Grid>
	);
	
	if (!isAuth) {
		createButton = null;
	}
	
	return (
		<Container maxWidth="md" className={classes.VideoGames}>
			<Grid container spacing={3} justify="space-between">
				<Grid item>
					<Typography gutterBottom variant="h2" component="h1">
						Video Games
					</Typography>
				</Grid>
				{createButton}
				{videoGameList}
			</Grid>
		</Container>
	);
};

export default withRouter(VideoGames);
