import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import Reviews from './containers/Reviews/Reviews';
import ReviewDetails from './components/Review/ReviewDetails/ReviewDetails';
import VideoGames from './containers/VideoGames/VideoGames';
import EditVideoGame from './components/VideoGame/EditVideoGame/EditVideoGame';
import EditReview from './components/Review/EditReview/EditReview';

function App () {
	return (
		<div>
            <Header />
            <Switch>
	            <Route path="/review-details" component={ReviewDetails} />
	            <Route path="/review/create" exact component={EditReview} />
	            <Route path="/review/:reviewId/edit" component={EditReview} />
	            <Route path="/video-game/create" component={EditVideoGame} />
	            <Route path="/video-game/:videoGameId/edit" component={EditVideoGame} />
	            <Route path="/video-games" component={VideoGames} />
	            <Route path="/" component={Reviews} />
            </Switch>
		</div>
	);
}

export default App;
