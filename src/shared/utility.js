export const getErrorMessage = (err) => {
	const error = err.response && err.response.data ? err.response.data : {};
	let message = error.data && error.data.length && error.data[0].msg ? error.data[0].msg : error.message;
	if (!message) {
		message = 'Something went wrong!'
	}
	
	return message;
};

export const hasError = (formError) => {
	let error = false;
	
	for (let prop in formError) {
		if (formError.hasOwnProperty(prop)) {
			if (formError[prop] || formError[prop] === null) {
				error = true;
			}
		}
	}
	
	return error;
};
