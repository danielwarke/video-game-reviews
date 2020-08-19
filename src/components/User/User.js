import React, { useContext, useState, useEffect } from 'react';

import {
	Button,
	Container,
	TextField,
	Typography,
	CircularProgress
} from '@material-ui/core';

import { AuthContext } from '../../context/auth-context';
import axios from '../../shared/axios';
import classes from './User.module.css';
import { getErrorMessage, hasError } from '../../shared/utility';
import Alert from '../UI/Alert/Alert';

const User = (props) => {
	const authContext = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	const [changePasswordForm, setChangePasswordForm] = useState({
		currentPassword: '',
		newPassword1: '',
		newPassword2: ''
	});
	
	const [formError, setFormError] = useState({
		currentPassword: null,
		newPassword1: null,
		newPassword2: null
	});
	
	const axiosConfig = {
		headers: {
			Authorization: 'Bearer ' + authContext.token
		}
	};
	
	useEffect(() => {
		const tempPassword = props.location.state ? props.location.state.tempPassword : null;
		if (tempPassword) {
			setIsChangingPassword(true);
		}
	}, [props.location.state]);
	
	const userReviewsButtonHandler = () => {
		props.history.push('/reviews?user=' + authContext.userId);
	};
	
	const inputChangedHandler = (event, fieldName) => {
		const updatedChangePasswordForm = { ...changePasswordForm };
		updatedChangePasswordForm[fieldName] = event.target.value;
		
		const updatedFormError = { ...formError };
		updatedFormError[fieldName] = event.target.required && !event.target.value;
		setFormError(updatedFormError);
		
		setChangePasswordForm(updatedChangePasswordForm);
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
	
	const changePassword = (event) => {
		event.preventDefault();
		
		if (changePasswordForm.newPassword1 !== changePasswordForm.newPassword2) {
			setAlert({
				open: true,
				severity: 'warning',
				message: 'Password do not match!'
			});
			
			return;
		}
		
		setLoading(true);
		
		axios.put('/change-password', {
			userId: authContext.userId,
			currentPassword: changePasswordForm.currentPassword,
			newPassword: changePasswordForm.newPassword1
		}, axiosConfig).then(response => {
			setLoading(false);
			setIsChangingPassword(false);
			setChangePasswordForm({
				currentPassword: '',
				newPassword1: '',
				newPassword2: ''
			});
			
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
	
	let changePasswordFormElement = null;
	
	if (isChangingPassword) {
		let changePasswordSubmitButton = (
			<Button className={classes.Button}
			        variant="contained"
			        type="submit"
			        disabled={hasError(formError)}
			        color="secondary">Submit</Button>
		);
		
		if (loading) {
			changePasswordSubmitButton = <CircularProgress />;
		}
		
		changePasswordFormElement = (
			<form onSubmit={changePassword} className={classes.Form}>
				<TextField
					className={classes.Input}
					label="Current Password"
					value={changePasswordForm.currentPassword}
					fullWidth
					type="password"
					error={formError.currentPassword}
					onChange={e => inputChangedHandler(e, 'currentPassword')}
					required />
				<TextField
					className={classes.Input}
					label="New Password"
					value={changePasswordForm.newPassword1}
					type="password"
					fullWidth
					error={formError.newPassword1}
					onChange={e => inputChangedHandler(e, 'newPassword1')}
					required />
				<TextField
					className={classes.Input}
					label="Confirm New Password"
					value={changePasswordForm.newPassword2}
					error={formError.newPassword2}
					type="password"
					fullWidth
					onChange={e => inputChangedHandler(e, 'newPassword2')}
					required />
				{changePasswordSubmitButton}
				<Button className={classes.Button}
				        variant="contained"
				        onClick={() => setIsChangingPassword(false)}
				        type="button">Cancel</Button>
			</form>
		);
	}
	
	return (
		<Container maxWidth="sm" className={classes.User}>
			<Typography gutterBottom variant="h3" component="h1">
				Account Details
			</Typography>
			<Typography gutterBottom variant="body1" component="p">
				Username: {authContext.username}
			</Typography>
			<Typography gutterBottom variant="body1" component="p">
				Email Address: {authContext.email}
			</Typography>
			<Button className={classes.Button} variant="contained" onClick={userReviewsButtonHandler}>My Reviews</Button>
			<div>
				{
					isChangingPassword ? changePasswordFormElement :
						<Button
							className={classes.Button}
							variant="contained"
							color="secondary"
							onClick={() => setIsChangingPassword(true)}>Change Password</Button>
				}
			</div>
			<Alert
				open={alert.open}
				severity={alert.severity}
				message={alert.message}
				onClose={handleAlertClosed}  />
		</Container>
	);
};

export default User;
