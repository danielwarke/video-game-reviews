import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar} from '@material-ui/core';

const Alert = (props) => (
	<Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
		<MuiAlert elevation={6} variant="filled" onClose={props.onClose} severity={props.severity}>
			{props.message}
		</MuiAlert>
	</Snackbar>
);

export default Alert;
