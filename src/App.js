import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import Reviews from './containers/Reviews/Reviews';
import ReviewDetails from './components/Review/ReviewDetails/ReviewDetails';
import VideoGames from './containers/VideoGames/VideoGames';
import EditVideoGame from './components/VideoGame/EditVideoGame/EditVideoGame';
import EditReview from './components/Review/EditReview/EditReview';
import Auth from './containers/Auth/Auth';
import { AuthContext } from './context/auth-context';

function App () {
	const authContext = useContext(AuthContext);
	
	let isLoggedIn = false;
	
	useEffect(() => {
		isLoggedIn = authContext.checkState();
	}, []);
	
	const authRoutes = (
		<React.Fragment>
			<Route path="/review/create" exact component={EditReview} />
			<Route path="/review/:reviewId/edit" component={EditReview} />
			<Route path="/video-game/create" component={EditVideoGame} />
			<Route path="/video-game/:videoGameId/edit" component={EditVideoGame} />
		</React.Fragment>
	);
	
	return (
		<div>
            <Header />
            <Switch>
	            {isLoggedIn ? authRoutes : null}
	            <Route path="/review-details" component={ReviewDetails} />
	            <Route path="/video-games" component={VideoGames} />
	            <Route path="/auth" component={Auth} />
	            <Route path="/" component={Reviews} />
            </Switch>
		</div>
	);
}

export default App;
