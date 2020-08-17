import React, { useState, useEffect } from 'react';

import {
	Container,
	Typography,
	CircularProgress
} from '@material-ui/core';

import axios from '../../shared/axios';

import classes from './Comments.module.css';
import Comment from '../../components/Comment/Comment';
import NewComment from '../../components/Comment/NewComment/NewComment';

const Comments = (props) => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		
		axios.get('/reviews/' + props.reviewId + '/comments').then(response => {
			setComments(response.data.comments);
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}, [props.reviewId]);
	
	const onCommentCreated = (comment) => {
		const updatedComments = [...comments];
		updatedComments.unshift(comment);
		setComments(updatedComments);
	};
	
	let commentList;
	let noneFoundMessage;
	
	if (!comments.length) {
		if (loading) {
			commentList = <CircularProgress className={classes.Center} />;
		} else {
			noneFoundMessage = (
				<Typography gutterBottom variant="p" component="body1" className={classes.Center}>
					No comments have been written for this review yet.
				</Typography>
			);
		}
	} else {
		commentList = comments.map(comment => (
			<Comment
				key={comment._id}
				author={comment.creator.username}
				commentId={comment._id}
				authorId={comment.creator._id}
				body={comment.body} />
		));
	}
	
	return (
		<div className={classes.Comments}>
			<Typography gutterBottom variant="h6" component="h6">
				Comments:
			</Typography>
			{noneFoundMessage}
			{commentList}
			<NewComment reviewId={props.reviewId} onCommentCreated={onCommentCreated} />
		</div>
	);
};

export default Comments;
