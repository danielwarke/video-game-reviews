import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Layout/Header/Header';
import Reviews from './containers/Reviews/Reviews';
import ReviewDetails from './components/Review/ReviewDetails/ReviewDetails';
import VideoGames from './containers/VideoGames/VideoGames';

function App () {
	return (
		<div>
            <Header />
            <Switch>
	            <Route path="/review-details" component={ReviewDetails} />
	            <Route path="/video-games" component={VideoGames} />
	            <Route path="/" component={Reviews} />
            </Switch>
		</div>
	);
}

export default App;
