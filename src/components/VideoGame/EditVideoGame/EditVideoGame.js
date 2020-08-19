import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {
	Container,
	Button,
	CircularProgress,
	TextField,
	Typography
} from '@material-ui/core'

import {
	Save as SaveIcon
} from '@material-ui/icons';

import axios from '../../../shared/axios';
import classes from './EditVideoGame.module.css';
import { AuthContext } from '../../../context/auth-context';
import Alert from '../../UI/Alert/Alert';
import { getErrorMessage, hasError } from '../../../shared/utility';

const EditVideoGame = (props) => {
	const [videoGame] = useState(props.location.state ? props.location.state.videoGame : {
		title: '',
		imageUrl: '',
		description: ''
	});
	
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	const [videoGameForm, setVideoGameForm] = useState({
		title: videoGame.title,
		imageUrl: videoGame.imageUrl,
		description: videoGame.description
	});
	
	const [formError, setFormError] = useState({
		title: videoGame.title ? false : null,
		imageUrl: videoGame.imageUrl ? false : null,
		description: videoGame.description ? false : null
	});
	
	const token = useContext(AuthContext).token;
	
	const axiosConfig = {
		headers: {
			Authorization: 'Bearer ' + token
		}
	};
	
	const createVideoGame = (title, description, imageUrl) => {
		axios.post('/video-games', {
			title: title,
			description: description,
			imageUrl: imageUrl
		}, axiosConfig).then(response => {
			setLoading(false);
			
			props.history.push('/video-games');
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	const editVideoGame = (title, description, imageUrl) => {
		axios.put('/video-games/' + videoGame.videoGameId, {
			title: title,
			description: description,
			imageUrl: imageUrl
		}, axiosConfig).then(response => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'success',
				message: response.data.message
			});
			
			setTimeout(() => {
				props.history.push('/video-games');
			}, 500);
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	const editVideoGameHandler = (event) => {
		event.preventDefault();
		
		const title = videoGameForm.title;
		const description = videoGameForm.description;
		const imageUrl = videoGameForm.imageUrl;
		
		setLoading(true);
		
		if (videoGame.videoGameId) {
			editVideoGame(title, description, imageUrl);
		} else {
			createVideoGame(title, description, imageUrl);
		}
	};
	
	const inputChangedHandler = (event, fieldName) => {
		const updatedVideoGameForm = { ...videoGameForm };
		updatedVideoGameForm[fieldName] = event.target.value;
		
		const updatedFormError = { ...formError };
		updatedFormError[fieldName] = event.target.required && !event.target.value;
		setFormError(updatedFormError);
		
		setVideoGameForm(updatedVideoGameForm);
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
	
	let button = <Button
		variant="contained"
		type="submit"
		color="primary"
		size="large"
		disabled={hasError(formError)}
		startIcon={<SaveIcon />}>
		Save
	</Button>;
	
	if (loading) {
		button = <CircularProgress />;
	}
	
	return (
		<Container maxWidth="sm" className={classes.EditVideoGame}>
			<form onSubmit={editVideoGameHandler} className={classes.Form}>
				<Typography
					gutterBottom
					variant="h2"
					component="h1">{(videoGame.videoGameId ? 'Edit' : 'Add') + ' Video Game'}</Typography>
				<TextField
					className={classes.Input}
					label="Title"
					value={videoGameForm.title}
					fullWidth
					error={formError.title}
					onChange={e => inputChangedHandler(e, 'title')}
					required />
				<TextField
					className={classes.Input}
					label="Image Url"
					value={videoGameForm.imageUrl}
					fullWidth
					error={formError.imageUrl}
					onChange={e => inputChangedHandler(e, 'imageUrl')}
					required />
				<Typography gutterBottom variant="h5" component="h5">
					Image Preview:
				</Typography>
				{videoGameForm.imageUrl ? <img src={videoGameForm.imageUrl} alt="Preview" className={classes.Image} /> : null}
				<TextField
					className={classes.Input}
					label="Game Description"
					value={videoGameForm.description}
					fullWidth
					error={formError.description}
					required
					multiline
					onChange={e => inputChangedHandler(e, 'description')}
					rowsMax={10} />
				{button}
				<Alert
					open={alert.open}
					severity={alert.severity}
					message={alert.message}
					onClose={handleAlertClosed}  />
			</form>
		</Container>
	);
};

export default withRouter(EditVideoGame);
