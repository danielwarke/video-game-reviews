import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Reviews from './containers/Reviews/Reviews';
import ReviewDetails from './components/Review/ReviewDetails/ReviewDetails';

function App () {
	return (
		<div>
            <Header />
            <Switch>
	            <Route path="/review-details" component={ReviewDetails} />
	            <Route path="/" component={Reviews} />
            </Switch>
		</div>
	);
}

export default App;
