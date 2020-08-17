import React from 'react';

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button
} from '@material-ui/core';

const Confirmation = (props) => {
	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{props.content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose} color="primary">
					{props.closeText || 'Cancel'}
				</Button>
				<Button onClick={props.onConfirm} color="primary" autoFocus>
					{props.confirmText || 'Confirm'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Confirmation;
