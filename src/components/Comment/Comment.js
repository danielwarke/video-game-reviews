import React, { useContext, useState, useEffect } from 'react';

import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography
} from '@material-ui/core';

import {Delete as DeleteIcon} from '@material-ui/icons';

import classes from './Comment.module.css';
import { AuthContext } from '../../context/auth-context';
import Confirmation from '../UI/Confirmation/Confirmation';

const Comment = (props) => {
	const userId = useContext(AuthContext).userId;
	const [isCreator, setIsCreator] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	
	useEffect(() => {
		if (userId === props.authorId) {
			setIsCreator(true);
		}
	}, []);
	
	const deleteComment = () => {
	
	};
	
	let deleteButton = null;
	
	if (isCreator) {
		deleteButton = <Button
			onClick={() => setConfirmOpen(true)}
			size="small"
			startIcon={<DeleteIcon />}>
			Delete
		</Button>;
	}
	
	return (
		<Card className={classes.Comment}>
			<CardContent>
				<Typography gutterBottom variant="body1" color="textSecondary" component="p">
					{props.author}
				</Typography>
				<Typography gutterBottom variant="h5" component="h5">
					{props.body}
				</Typography>
			</CardContent>
			<CardActions>
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
