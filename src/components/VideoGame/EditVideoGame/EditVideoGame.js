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
import {getErrorMessage} from '../../../shared/utility';

const EditVideoGame = (props) => {
	const [videoGame, setVideoGame] = useState(props.location.state ? props.location.state.videoGame : {});
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
	
	const token = useContext(AuthContext).token;
	
	const axiosConfig = {
		headers: {
			Authorization: 'Bearer ' + token
		}
	};
	
	const createVideoGame = (title, description, imageUrl) => {
		console.log('CREATE', title, description, imageUrl);
		
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
					onChange={(e) => inputChangedHandler(e, 'title')}
					required />
				<TextField
					className={classes.Input}
					label="Image Url"
					value={videoGameForm.imageUrl}
					fullWidth
					onChange={(e) => inputChangedHandler(e, 'imageUrl')}
					required />
				<Typography gutterBottom variant="h5" component="h5">
					Image Preview:
				</Typography>
				<img src={videoGame.imageUrl} alt="Image Preview" className={classes.Image} />
				<TextField
					className={classes.Input}
					label="Game Description"
					value={videoGameForm.description}
					fullWidth
					required
					multiline
					onChange={(e) => inputChangedHandler(e, 'description')}
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
