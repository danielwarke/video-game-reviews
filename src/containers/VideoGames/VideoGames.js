import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import axios from '../../shared/axios';
import VideoGame from '../../components/VideoGame/VideoGame';

const VideoGames = () => {
	const [videoGames, setVideoGames] = useState([
		{
			title: 'Paper Mario: The Origami King',
			description: 'A single player adventure game developer by Nintendo',
			imageUrl: 'https://images.nintendolife.com/cfb927ec2c8d0/1280x720.jpg',
			averageRating: 4
		}
	]);
	
	const videoGameList = videoGames.map((videoGame, i) => (
		<Grid item key={i} xs={6}>
			<VideoGame {...videoGame} />
		</Grid>
	));
	
	return (
		<Container maxWidth="md">
			<Grid container spacing={3}>
				{videoGameList}
			</Grid>
		</Container>
	);
};

export default VideoGames;
