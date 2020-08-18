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
import Confirmation from '../../components/UI/Confirmation/Confirmation';

const Auth = (props) => {
	const authContext = useContext(AuthContext);
	
	const [isSignup, setIsSignup] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	const [confirmOpen, setConfirmOpen] = useState(false);
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
			
			if (response.data.tempPassword) {
				props.history.replace({
					pathname: '/user',
					state: {
						tempPassword: true
					}
				});
			} else {
				props.history.replace('/');
			}
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
	
	const forgotPasswordButtonHandler = () => {
		if (!loginForm.email) {
			setAlert({
				open: true,
				severity: 'warning',
				message: 'Please enter an email address first.'
			});
			
			return;
		}
		
		setConfirmOpen(true);
	};
	
	const forgotPassword = () => {
		setConfirmOpen(false);
		setLoading(true);
		
		axios.post('/forgot-password', { email: loginForm.email }).then(response => {
			setLoading(false);
			
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
			<div style={{ marginTop: '15px' }}>
				{
					isSignup ? null :
						<Button
							className={classes.Button}
							variant="contained"
							type="button"
							size="small"
							onClick={forgotPasswordButtonHandler}>
							Forgot Password?
						</Button>
				}
				<Button
					className={classes.Button}
					variant="contained"
					type="button"
					size="small"
					onClick={() => setIsSignup(!isSignup)}>
					{isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
				</Button>
			</div>
		</React.Fragment>
	);
	
	if (loading) {
		buttons = <CircularProgress />;
	}
	
	return (
		<Container maxWidth="sm" className={classes.Auth}>
			<form onSubmit={authSubmitHandler} className={classes.Form} autoComplete="false">
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
				<Confirmation
					open={confirmOpen}
					title="Forgot Password?"
					content="After clicking confirm we will send you a new temporary password."
					onClose={() => setConfirmOpen(false)}
					onConfirm={forgotPassword} />
			</form>
		</Container>
	);
};

export default withRouter(Auth);
