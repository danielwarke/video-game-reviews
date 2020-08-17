import React, {useContext, useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';

import {
	Container,
	Button,
	CircularProgress,
	TextField,
	Typography,
	Select,
	MenuItem
} from '@material-ui/core'

import {
	Save as SaveIcon,
	Delete as DeleteIcon
} from '@material-ui/icons';

import { Rating } from '@material-ui/lab';

import classes from './EditReview.module.css';
import { AuthContext } from '../../../context/auth-context';
import { VideoGameContext } from '../../../context/video-game-context';
import {getErrorMessage} from '../../../shared/utility';
import Alert from '../../UI/Alert/Alert';
import Confirmation from '../../UI/Confirmation/Confirmation';
import axios from '../../../shared/axios';

const EditReview = (props) => {
	const videoGameContext = useContext(VideoGameContext);
	const [review, setReview] = useState(props.location.state ? props.location.state.review : {
		videoGameId: '',
		title: '',
		rating: 0,
		body: ''
	});
	
	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	const [reviewForm, setReviewForm] = useState({
		videoGameId: review.videoGameId,
		title: review.title,
		rating: review.rating,
		body: review.body
	});
	
	const token = useContext(AuthContext).token;
	
	const axiosConfig = {
		headers: {
			Authorization: 'Bearer ' + token
		}
	};
	
	useEffect(() => {
		videoGameContext.getVideoGames();
	}, []);
	
	const createReview = (title, rating, body, videoGameId) => {
		axios.post('/review', {
			title: title,
			rating: rating,
			body: body,
			videoGameId: videoGameId
		}, axiosConfig).then(response => {
			setLoading(false);
			
			props.history.push('/');
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	const editReview = (title, rating, body, videoGameId) => {
		axios.put('/review/' + review.reviewId, {
			title: title,
			rating: rating,
			body: body,
			videoGameId: videoGameId
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
	
	const deleteReview = () => {
		setDeleteLoading(true);
		setConfirmOpen(false);
		
		axios.delete('/review/' + review.reviewId, axiosConfig).then(response => {
			setDeleteLoading(false);
			
			setAlert({
				open: true,
				severity: 'warning',
				message: 'Review Deleted Successfully'
			});
			
			setTimeout(() => {
				props.history.replace('/');
			}, 1500);
		}).catch(err => {
			setDeleteLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	const editReviewHandler = (event) => {
		event.preventDefault();
		
		const title = reviewForm.title;
		const rating = reviewForm.rating;
		const body = reviewForm.body;
		const videoGameId = reviewForm.videoGameId;
		
		setLoading(true);
		
		if (review.reviewId) {
			editReview(title, rating, body, videoGameId);
		} else {
			createReview(title, rating, body, videoGameId);
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
	
	const ratingChangedHandler = (newValue) => {
		const updatedReviewForm = { ...reviewForm };
		updatedReviewForm.rating = newValue;
		
		setReviewForm(updatedReviewForm);
	};
	
	const inputChangedHandler = (event, fieldName) => {
		const updatedReviewForm = { ...reviewForm };
		updatedReviewForm[fieldName] = event.target.value;
		
		setReviewForm(updatedReviewForm);
	};
	
	let videoGameSelect;
	
	if (!videoGameContext.videoGames.length) {
		videoGameSelect = <CircularProgress />;
	} else {
		videoGameSelect = (
			<Select
				style={{ width: '100%' }}
				labelId="videoGameSelect"
				value={reviewForm.videoGameId}
				inputProps={{ readOnly: !!review.reviewId }}
				onChange={e => inputChangedHandler(e, 'videoGameId')}>
				{videoGameContext.videoGames.map(videoGame => (
					<MenuItem key={videoGame.videoGameId} value={videoGame.videoGameId}>{videoGame.title}</MenuItem>
				))}
			</Select>
		);
	}
	
	let saveButton = <Button
		variant="contained"
		type="submit"
		className={classes.Button}
		color="primary"
		size="large"
		startIcon={<SaveIcon />}>
		Save
	</Button>;
	
	if (loading) {
		saveButton = <CircularProgress />;
	}
	
	let deleteButton = null;
	
	if (review.reviewId) {
		deleteButton = <Button
			variant="contained"
			type="button"
			className={classes.Button}
			onClick={() => setConfirmOpen(true)}
			color="secondary"
			size="large"
			startIcon={<DeleteIcon />}>
			Delete
		</Button>;
	}
	
	if (deleteLoading) {
		deleteButton = <CircularProgress />;
	}
	
	return (
		<Container maxWidth="sm" className={classes.EditReview}>
			<form onSubmit={editReviewHandler} className={classes.Form}>
				<Typography gutterBottom variant="h2" component="h1">{(review.reviewId ? 'Edit' : 'Write New') + ' Review'}</Typography>
				<Typography gutterBottom variant="body2" component="h5">
					Video Game
				</Typography>
				{videoGameSelect}
				<TextField
					className={classes.Input}
					label="Title"
					value={reviewForm.title}
					onChange={e => inputChangedHandler(e, 'title')}
					fullWidth
					required />
				<Typography gutterBottom variant="body2" component="h5">
					Rating
				</Typography>
				<Rating
					name="rating"
					value={reviewForm.rating}
					onChange={(e, newValue) => ratingChangedHandler(newValue)} />
				<TextField
					className={classes.Input}
					label="Body"
					value={reviewForm.body}
					onChange={e => inputChangedHandler(e, 'body')}
					fullWidth
					required
					multiline
					rowsMax={25} />
				{saveButton}
				{deleteButton}
				<Alert
					open={alert.open}
					severity={alert.severity}
					message={alert.message}
					onClose={handleAlertClosed}  />
				<Confirmation
					open={confirmOpen}
					title="Delete Review?"
					content="Are you sure you want to delete this review?"
					onClose={() => setConfirmOpen(false)}
					onConfirm={deleteReview} />
			</form>
		</Container>
	);
};

export default withRouter(EditReview);
