import React, { useState, useReducer, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Button,
	CircularProgress,
	Container,
	TextField,
	Typography
} from '@material-ui/core';

import {
	LockOpen
} from '@material-ui/icons';

import axios from '../../shared/axios';
import classes from './Auth.module.css';
import authReducer from '../../store/reducers/auth';
import * as actions from '../../store/actions/auth';

const Auth = (props) => {
	const [state, dispatch] = useReducer(authReducer);
	const [isSignup, setIsSignup] = useState(false);
	const [loading, setLoading] = useState(false);
	
	const [loginForm, setLoginForm] = useState({
		username: '',
		email: '',
		password: ''
	});
	
	useEffect(() => {
		dispatch(actions.authSetLoginButton(null));
	}, [dispatch]);
	
	const authSubmitHandler = (event) => {
		event.preventDefault();
		
		console.log(loginForm);
		
		const email = loginForm.email;
		const username = loginForm.username;
		const password = loginForm.password;
		
		if (isSignup) {
			// axios.post('/signup', {
			// 	email:
			// });

			// dispatch(actions.AUTH_SIGNUP, {
			// 	email: email
			// });
		} else {
			dispatch(actions.authLogin('blah', 'blah'));
		}
		
		dispatch(actions.authSetLoginButton('Logout'));
		props.history.replace('/');
	};
	
	const inputChangedHandler = (event, fieldName) => {
		const updatedLoginForm = { ...loginForm };
		updatedLoginForm[fieldName] = event.target.value;
		
		setLoginForm(updatedLoginForm);
	};
	
	const toggleSignUpHandler = () => {
		setIsSignup(!isSignup);
	};
	
	let buttons = (
		<React.Fragment>
			<Button
				className={classes.Button}
				variant="contained"
				type="submit"
				color="primary"
				size="large"
				startIcon={<LockOpen />}>
				{isSignup ? 'Sign Up' : 'Login'}
			</Button>
			<Button
				className={classes.Button}
				variant="contained"
				type="button"
				color="secondary"
				size="large"
				onClick={toggleSignUpHandler}>
				{isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
			</Button>
		</React.Fragment>
	);
	
	if (loading) {
		buttons = <CircularProgress />;
	}
	
	return (
		<Container maxWidth="sm" className={classes.Auth}>
			<form onSubmit={authSubmitHandler} className={classes.Form}>
				<TextField
					className={classes.Input}
					label="Email Address"
					fullWidth
					required
					value={loginForm.email}
					onChange={(e) => inputChangedHandler(e, 'email')} />
				{isSignup ? <TextField
					className={classes.Input}
					label="Username"
					fullWidth
					required
					value={loginForm.username}
					onChange={(e) => inputChangedHandler(e, 'username')}/> : null}
				<TextField
					className={classes.Input}
					label="Password"
					type="password"
					fullWidth
					required
					value={loginForm.password}
					onChange={(e) => inputChangedHandler(e, 'password')}/>
				{buttons}
			</form>
		</Container>
	);
};

export default withRouter(Auth);
