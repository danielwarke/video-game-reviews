import React, { useState } from 'react';

import axios from '../shared/axios';
import {getErrorMessage} from '../shared/utility';

export const VideoGameContext = React.createContext({
	videoGames: [],
	loading: false,
	errorObj: null,
	getVideoGames: () => {}
});

export default props => {
	const [videoGameState, setVideoGameState] = useState({
		videoGames: [],
		errorObj: null,
		loading: false
	});
	
	const getVideoGames = (fetchAgain) => {
		if (videoGameState.videoGames.length && !fetchAgain) {
			return;
		}
		
		setVideoGameState({
			...videoGameState,
			loading: true
		});
		
		axios.get('/video-games').then(response => {
			const fetchedVideoGames = response.data.videoGames;
			fetchedVideoGames.forEach(videoGame => {
				videoGame.videoGameId = videoGame._id;
			});
			
			setVideoGameState({
				videoGames: fetchedVideoGames,
				loading: false
			});
		}).catch(err => {
			setVideoGameState({
				...videoGameState,
				loading: false,
				errorObj: {
					open: true,
					severity: 'error',
					message: getErrorMessage(err)
				}
			});
		});
	};
	
	const videoGameValue = {
		...videoGameState,
		getVideoGames: getVideoGames
	};
	
	return (
		<VideoGameContext.Provider value={videoGameValue}>
			{props.children}
		</VideoGameContext.Provider>
	);
};
