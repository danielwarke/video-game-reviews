import React, { useState, useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar} from '@material-ui/core';

const Alert = (props) => (
	<Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleSnackbarClosed}>
		<MuiAlert elevation={6} variant="filled" onClose={props.handleSnackbarClosed} severity={props.severity}>
			{props.message}
		</MuiAlert>
	</Snackbar>
);

export default Alert;
