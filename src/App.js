import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import Header from './components/Layout/Header/Header';
import Reviews from './containers/Reviews/Reviews';
import ReviewDetails from './components/Review/ReviewDetails/ReviewDetails';
import VideoGames from './containers/VideoGames/VideoGames';
import EditVideoGame from './components/VideoGame/EditVideoGame/EditVideoGame';
import EditReview from './components/Review/EditReview/EditReview';
import Auth from './containers/Auth/Auth';
import User from './components/User/User';
import { AuthContext } from './context/auth-context';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#7e57c2'
		},
		secondary: {
			main: '#ffd54f'
		}
	}
});

function App (props) {
	const token = localStorage.getItem('token');
	const isAuth = token !== null;
	const checkState = useContext(AuthContext).checkState;
	
	useEffect(() => {
		checkState();
	}, []);
	
	let routes = (
		<Switch>
			<Route key="review-details" path="/review-details" component={ReviewDetails} />
			<Route key="video-games" path="/video-games" component={VideoGames} />
			<Route key="auth" path="/auth" component={Auth} />
			<Route key="reviews" path="/" component={Reviews} />
		</Switch>
	);
	
	if (isAuth) {
		routes = (
			<Switch>
				<Route key="review-details" path="/review-details" component={ReviewDetails} />
				<Route key="video-games" path="/video-games" component={VideoGames} />
				<Route key="auth" path="/auth" component={Auth} />
				<Route key="create-review" path="/review/create" exact component={EditReview} />
				<Route key="edit-review" path="/review/:reviewId/edit" component={EditReview} />
				<Route key="create-video-game" path="/video-game/create" component={EditVideoGame} />
				<Route key="edit-video-game" path="/video-game/:videoGameId/edit" component={EditVideoGame} />
				<Route key="user" path="/user" component={User} />
				<Route key="reviews" path="/" component={Reviews} />
			</Switch>
		);
	}
	
	return (
		<MuiThemeProvider theme={theme}>
            <Header />
			{routes}
		</MuiThemeProvider>
	);
}

export default App;
