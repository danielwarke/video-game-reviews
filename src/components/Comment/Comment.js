import React, { useContext, useState, useEffect } from 'react';

import {
	Button,
	Card,
	CardActions,
	CardContent, CircularProgress, TextField,
	Typography
} from '@material-ui/core';

import {
	Chat as ChatIcon,
	Delete as DeleteIcon,
	Edit as EditIcon
} from '@material-ui/icons';

import classes from './Comment.module.css';
import { AuthContext } from '../../context/auth-context';
import Confirmation from '../UI/Confirmation/Confirmation';
import axios from '../../shared/axios';
import {getErrorMessage} from '../../shared/utility';

const Comment = (props) => {
	const userId = useContext(AuthContext).userId;
	const token = useContext(AuthContext).token;
	
	const [isCreator, setIsCreator] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [commentBody, setCommentBody] = useState(props.body);
	const [isWriting, setIsWriting] = useState(false);
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
	
	useEffect(() => {
		if (userId === props.authorId) {
			setIsCreator(true);
		}
	}, []);
	
	const inputChangedHandler = (e) => {
		setCommentBody(e.target.value);
	};
	
	const deleteComment = () => {
		setLoading(true);
		
		axios.delete('/reviews/' + props.reviewId + '/comment/' + props.commentId, axiosConfig).then(response => {
			setLoading(false);
			
			props.onCommentDeleted(props.commentId);
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	const editComment = () => {
		setLoading(true);
		
		axios.put('/reviews/' + props.reviewId + '/comment/' + props.commentId, {
			body: commentBody
		}, axiosConfig).then(response => {
			setLoading(false);
			setIsWriting(false);
			
			props.onCommentEdited(props.commentId, commentBody);
		}).catch(err => {
			setLoading(false);
			
			setAlert({
				open: true,
				severity: 'error',
				message: getErrorMessage(err)
			});
		});
	};
	
	let deleteButton = null;
	let editButton = null;
	
	if (isCreator && !isWriting) {
		deleteButton = (
			<Button
				onClick={() => setConfirmOpen(true)}
				size="small"
				startIcon={<DeleteIcon />}>
				Delete
			</Button>
		);
		
		editButton = (
			<Button
				onClick={() => setIsWriting(true)}
				size="small"
				startIcon={<EditIcon />}>
				Edit
			</Button>
		);
	}
	
	let cardBody = (
		<Typography gutterBottom variant="h5" component="h5">
			{props.body}
		</Typography>
	);
	
	if (isWriting) {
		let saveButton = (
			<Button onClick={editComment}>Save Changes</Button>
		);
		
		if (loading) {
			saveButton = <CircularProgress />;
		}
		
		cardBody = (
			<React.Fragment>
				<TextField
					value={commentBody}
					onChange={inputChangedHandler}
					fullWidth
					required
					multiline
					rowsMax={10} />
				{saveButton}
				<Button onClick={() => setIsWriting(false)}>Cancel</Button>
			</React.Fragment>
		);
	}
	
	return (
		<Card className={classes.Comment}>
			<CardContent>
				<Typography gutterBottom variant="body1" color="textSecondary">
					{props.author}
				</Typography>
				{cardBody}
			</CardContent>
			<CardActions>
				{editButton}
				{deleteButton}
			</CardActions>
			<Confirmation
				open={confirmOpen}
				title="Delete Comment?"
				content="Are you sure you want to delete your comment?"
				onClose={() => setConfirmOpen(false)}
				onConfirm={deleteComment} />
		</Card>
	);
};

export default Comment;
