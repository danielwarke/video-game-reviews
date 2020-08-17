import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Button,
	CircularProgress,
	Container,
	TextField
} from '@material-ui/core';

import {
	LockOpen
} from '@material-ui/icons';

import axios from '../../shared/axios';
import classes from './Auth.module.css';
import { AuthContext } from '../../context/auth-context';
import { getErrorMessage } from '../../shared/utility';
import Alert from '../../components/UI/Alert/Alert';

const Auth = (props) => {
	const authContext = useContext(AuthContext);
	
	const [isSignup, setIsSignup] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	const [loading, setLoading] = useState(false);
	const [loginForm, setLoginForm] = useState({
		username: '',
		email: '',
		password: ''
	});
	
	useEffect(() => {
		authContext.setLoginButton(null);
	}, []);
	
	const signUp = (email, username, password) => {
		axios.put('/signup', {
			email: email,
			username: username,
			password: password
		}).then(response => {
			setLoading(false);
			
			setLoginForm({
				username: '',
				email: '',
				password: ''
			});
			
			setIsSignup(false);
			
			setAlert({
				open: true,
				severity: 'success',
				message: response.data.message
			});
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	const login = (email, password) => {
		axios.post('/login', {
			email: email,
			password: password
		}).then(response => {
			setLoading(false);
			const token = response.data.token;
			const userId = response.data.userId;
			const username = response.data.username;
			const email = response.data.email;
			const expiresIn = response.data.expiresIn;
			const isAdmin = response.data.admin;
			
			authContext.login(token, userId, username, email, isAdmin, expiresIn);
			props.history.replace('/');
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	const authSubmitHandler = (event) => {
		event.preventDefault();
		
		const email = loginForm.email;
		const username = loginForm.username;
		const password = loginForm.password;
		
		setLoading(true);
		
		if (isSignup) {
			signUp(email, username, password);
		} else {
			login(email, password);
		}
	};
	
	const handleAlertClosed = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		
		setAlert({
			...alert,
			open: false
		});
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
				<Alert
					open={alert.open}
					severity={alert.severity}
					message={alert.message}
					onClose={handleAlertClosed}  />
			</form>
		</Container>
	);
};

export default withRouter(Auth);
