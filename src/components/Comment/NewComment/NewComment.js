import React, {useContext, useState} from 'react';
import { withRouter } from 'react-router-dom';

import {
	Button,
	CircularProgress,
	TextField,
	Box
} from '@material-ui/core';

import {Chat as ChatIcon} from '@material-ui/icons';

import { getErrorMessage } from '../../../shared/utility';
import Alert from '../../../components/UI/Alert/Alert';
import {AuthContext} from '../../../context/auth-context';
import classes from './NewComment.module.css';
import axios from '../../../shared/axios';

const NewComment = (props) => {
	const isAuth = useContext(AuthContext).token !== null;
	const token = useContext(AuthContext).token;
	
	const [isWriting, setIsWriting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newComment, setNewComment] = useState('');
	const [alert, setAlert] = useState({
		open: false,
		severity: 'success',
		message: ''
	});
	
	const axiosConfig = {
		headers: {
			Authorization: 'Bearer ' + token
		}
	};
	
	const createComment = (event) => {
		event.preventDefault();
		
		if (!newComment) {
			return;
		}
		
		setLoading(true);
		
		axios.post('/reviews/' + props.reviewId + '/comment', {
			body: newComment
		}, axiosConfig).then(response => {
			setLoading(false);
			setNewComment('');
			setIsWriting(false);
			
			setAlert({
				open: true,
				severity: 'success',
				message: 'Your comment has been added.'
			});
			
			const comment = response.data.comment;
			comment.creator = response.data.creator;
			
			props.onCommentCreated(comment);
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
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
	
	const inputChangedHandler = (event) => {
		setNewComment(event.target.value);
	};
	
	const writeCommentButtonHandler = () => {
		if (isAuth) {
			setIsWriting(true);
		} else {
			props.history.push('/auth');
		}
	};
	
	const writeCommentButton = <Button
		className={classes.Center}
		variant="contained"
		color="secondary"
		type="button"
		onClick={writeCommentButtonHandler}>
		{isAuth ? 'Write a Comment' : 'Login to Write a Comment'}
	</Button>;
	
	let saveButton = (
		<Button
			variant="contained"
			className={classes.Button}
			color="primary"
			startIcon={<ChatIcon />}
			type="submit">Post</Button>
	);
	
	if (loading) {
		saveButton = <CircularProgress />;
	}
	
	const newCommentForm = (
		<form onSubmit={createComment} className={classes.Form}>
			<Box>
				<TextField
					className={classes.Input}
					label="Your Comment"
					value={newComment}
					onChange={inputChangedHandler}
					fullWidth
					required
					variant="outlined"
					multiline
					rowsMax={10} />
				{saveButton}
				<Alert
					open={alert.open}
					severity={alert.severity}
					message={alert.message}
					onClose={handleAlertClosed}  />
			</Box>
		</form>
	);
	
	return isWriting ? newCommentForm : writeCommentButton;
};

export default withRouter(NewComment);
